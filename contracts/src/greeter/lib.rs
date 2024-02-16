#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod amarketplace {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[ink(event)]
    pub struct RandomEvent {
        from: Option<AccountId>,
        message: String,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        InsufficientBalance,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Auction {
        name: String,
        description: String,
        tags: Vec<String>,
        duration: u64,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Offer {
        author: AccountId,
        description: String,
        duration: u64,
        reward: Balance,
    }

    #[ink(storage)]
    pub struct AMarketplace {
        admin: AccountId,
        mediator: AccountId,
        is_paused: bool,
        balances: Mapping<AccountId, Balance>,
        user_auctions: Mapping<AccountId, Vec<u64>>,
        auctions: Mapping<u64, Auction>,
        auction_offers: Mapping<u64, Offer>,
        offer_deposit: Balance,
        auction_deposit: Balance,
        next_auction_id: u64,
    }

    impl AMarketplace {
        /// Creates a new greeter contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(
            admin: AccountId,
            mediator: AccountId,
            auction_deposit: Balance,
            offer_deposit: Balance,
        ) -> Self {
            Self {
                admin,
                mediator,
                is_paused: false,
                auction_deposit,
                offer_deposit,
                balances: Mapping::new(),
                auction_offers: Mapping::new(),
                auctions: Mapping::new(),
                user_auctions: Mapping::new(),
                next_auction_id: 1,
            }
        }

        #[ink(message, payable)]
        pub fn create_auction(
            &mut self,
            name: String,
            description: String,
            tags: Vec<String>,
            duration: u64,
        ) {
            let caller = self.env().caller();
            let attached_deposit = self.env().transferred_value();
            assert_eq!(attached_deposit, self.auction_deposit, "wrong deposit");
            let auction = Auction {
                name,
                description,
                tags,
                duration,
            };
            self.auctions.insert(self.next_auction_id.clone(), &auction);
            let mut user_auctions: Vec<u64> = self.user_auctions.get(caller).unwrap_or(Vec::new());
            user_auctions.push(self.next_auction_id.clone());
            self.user_auctions.insert(caller, &user_auctions);
            self.next_auction_id += 1;
        }

        /// Returns the admin address.
        #[ink(message)]
        pub fn admin(&self) -> AccountId {
            self.admin
        }

        #[ink(message)]
        pub fn user_auctions(&self, user: AccountId) -> Vec<Auction> {
            let mut results: Vec<Auction> = Vec::new();
            for i in self.user_auctions.get(user).unwrap() {
                results.push(self.auctions.get(i).unwrap());
            }
            results
        }

        /// Returns the mediator address.
        #[ink(message)]
        pub fn mediator(&self) -> AccountId {
            self.mediator
        }

        fn assert_admin(&self) {
            assert_eq!(self.admin, Self::env().caller(), "not an admin")
        }

        fn assert_not_paused(&self) {
            assert!(!self.is_paused);
        }

        /// Sets new admin.
        /// Panics if caller not admin
        #[ink(message)]
        pub fn set_admin(&mut self, new_admin: AccountId) {
            self.assert_not_paused();
            self.assert_admin();
            self.admin = new_admin;
        }

        pub fn pause(&mut self) {
            self.assert_admin();
            self.is_paused = true;
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> Balance {
            self.balances.get(owner).unwrap_or_default()
        }
    }

    #[cfg(test)]
    mod tests {
        use std::thread::AccessError;

        use super::*;

        use ink::{
            env::test::{
                default_accounts, get_account_balance, recorded_events, DefaultAccounts,
                EmittedEvent,
            },
            primitives::AccountId,
        };
        use scale::Decode;

        const AZERO: Balance = 1_000_000_000_000;
        const ONE_HOUR: u64 = 3_600_000;

        // Returns accounts that are pre-seeded in the test database.
        // We can use them as authors for transactions.
        fn get_default_test_accounts() -> DefaultAccounts<ink::env::DefaultEnvironment> {
            default_accounts::<ink::env::DefaultEnvironment>()
        }

        // Sets caller returned by the next `Self::env().caller()` method call
        // in the contract.
        fn set_caller(caller: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(caller);
        }

        fn set_deposit(amount: Balance) {
            ink::env::test::set_value_transferred::<ink::env::DefaultEnvironment>(amount);
        }

        fn setup() -> AMarketplace {
            let admin: ink::primitives::AccountId = get_default_test_accounts().alice;
            let mediator = get_default_test_accounts().bob;
            AMarketplace::new(admin, mediator, 10 * AZERO, 15 * AZERO)
        }

        #[ink::test]
        fn basics() {
            let admin: ink::primitives::AccountId = get_default_test_accounts().alice;
            let contract = setup();
            assert_eq!(contract.admin(), admin);
        }

        #[ink::test]
        fn set_admin() {
            let admin: ink::primitives::AccountId = get_default_test_accounts().alice;
            let mut contract = setup();
            set_caller(admin);
            let new_admin = get_default_test_accounts().charlie;
            contract.set_admin(new_admin);
            assert_eq!(contract.admin(), new_admin);
        }

        #[ink::test]
        #[should_panic(expected = "not an admin")]
        fn set_admin_not_admin() {
            let mut contract = setup();
            let new_admin = get_default_test_accounts().charlie;
            set_caller(new_admin);
            contract.set_admin(new_admin);
        }

        #[ink::test]
        fn create_auction() {
            let frank: ink::primitives::AccountId = get_default_test_accounts().frank;
            let mut contract = setup();
            set_caller(frank);
            set_deposit(10 * AZERO);
            contract.create_auction(
                "test name".to_string(),
                "test description".to_string(),
                vec!["test tag".to_string()],
                ONE_HOUR,
            );

            let user_auctions = contract.user_auctions(frank);
            assert_eq!(user_auctions.len(), 1);
            assert_eq!(user_auctions[0].name, "test name");
            assert_eq!(user_auctions[0].description, "test description");
            assert_eq!(user_auctions[0].tags, vec!["test tag"]);
        }
    }
}
