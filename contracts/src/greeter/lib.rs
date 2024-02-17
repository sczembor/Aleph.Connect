#![cfg_attr(not(feature = "std"), no_std, no_main)]

const ONE_HOUR: u64 = 3_600_000;

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
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Auction {
        author: AccountId,
        name: String,
        description: String,
        tags: Vec<String>,
        created_at: u64,
        expires_at: u64,
        status: AuctionStatus,
        accepted_offer: Option<u64>,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum AuctionStatus {
        InProgress,
        OfferAccepted,
        JobAccepted,
        JobDelivered,
        Finalized,
        Conflict,
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
        status: AuctionStatus,
        accepted_at: Option<u64>,
        started_at: Option<u64>,
        delivered_at: Option<u64>,
    }

    /// Errors that can occur upon calling this contract.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub enum Error {
        TransferFailed,
        CallerNotFound,
        Unauthorized,
        AuctionNotFound,
    }

    /// Type alias for the contract's `Result` type.
    pub type Result<T> = core::result::Result<T, Error>;

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Config {
        admin: AccountId,
        mediator: AccountId,
        auction_deposit: Balance,
        offer_deposit: Balance,
        auction_duration: u64,
        accept_offer_duration: u64,
    }

    #[ink(storage)]
    pub struct AMarketplace {
        admin: AccountId,
        mediator: AccountId,
        is_paused: bool,
        balances: Mapping<AccountId, Balance>,
        user_auctions: Mapping<AccountId, Vec<u64>>,
        user_offers: Mapping<AccountId, Vec<u64>>,
        auctions: Mapping<u64, Auction>,
        auction_offers: Mapping<u64, Vec<u64>>,
        offers: Mapping<u64, Offer>,
        offer_deposit: Balance,
        auction_deposit: Balance,
        next_auction_id: u64,
        next_offer_id: u64,
        accept_offer_duration: u64,
        auction_duration: u64,
        auction_offer_status: Mapping<(u64, u64), AuctionStatus>,
    }

    impl AMarketplace {
        /// Creates a new greeter contract initialized with the given value.
        #[ink(constructor)]
        pub fn new(
            admin: AccountId,
            mediator: AccountId,
            auction_deposit: Balance,
            offer_deposit: Balance,
            accept_offer_duration: u64,
            auction_duration: u64,
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
                user_offers: Mapping::new(),
                offers: Mapping::new(),
                next_auction_id: 1,
                next_offer_id: 1,
                accept_offer_duration,
                auction_duration,
                auction_offer_status: Mapping::new(),
            }
        }

        #[ink(message, payable)]
        pub fn create_auction(&mut self, name: String, description: String, tags: Vec<String>) {
            let caller = self.env().caller();
            let now = self.env().block_timestamp();
            let attached_deposit = self.env().transferred_value();
            assert_eq!(attached_deposit, self.auction_deposit, "wrong deposit");
            let auction = Auction {
                author: caller,
                name,
                description,
                tags,
                created_at: now,
                expires_at: now + self.auction_duration,
                status: AuctionStatus::InProgress,
                accepted_offer: None,
            };
            self.auctions.insert(self.next_auction_id.clone(), &auction);
            let mut user_auctions: Vec<u64> = self.user_auctions.get(caller).unwrap_or(Vec::new());
            user_auctions.push(self.next_auction_id.clone());
            self.user_auctions.insert(caller, &user_auctions);
            self.next_auction_id += 1;
        }

        #[ink(message, payable)]
        pub fn accept_offer(&mut self, auction_id: u64, offer_id: u64) -> Result<()> {
            let caller = self.env().caller();

            let attached_deposit = self.env().transferred_value();

            match self.user_auctions.get(caller) {
                Some(auction_ids) if auction_ids.iter().any(|id| *id == auction_id) => {
                    let mut auction = self.auctions.get(auction_id).unwrap();
                    assert!(
                        auction.expires_at > self.env().block_timestamp(),
                        "auction expired"
                    );

                    assert!(self.offers.contains(offer_id), "offer not found");
                    let mut offer = self.offers.get(offer_id).unwrap();
                    assert!(offer.reward == attached_deposit, "wrong deposit");
                    offer.status = AuctionStatus::OfferAccepted;
                    self.auction_offer_status
                        .insert((auction_id, offer_id), &AuctionStatus::OfferAccepted);
                    auction.status = AuctionStatus::OfferAccepted;
                    self.offers.insert(offer_id, &offer);
                    auction.accepted_offer = Some(offer_id);
                    self.auctions.insert(auction_id, &auction);
                    Ok(())
                }
                _ => Err(match self.user_auctions.get(caller) {
                    None => Error::CallerNotFound,
                    Some(_) => Error::AuctionNotFound,
                }),
            }
        }

        #[ink(message, payable)]
        pub fn accept_job(&mut self, auction_id: u64, offer_id: u64) {
            let caller = self.env().caller();
            let now = self.env().block_timestamp();
            let attached_deposit = self.env().transferred_value();
            assert_eq!(attached_deposit, self.offer_deposit, "wrong deposit");
            assert!(self.offers.contains(offer_id), "offer not found");
            let mut offer = self.offers.get(offer_id).unwrap();
            assert!(offer.author == caller, "not autoher of the offer");
            assert!(
                offer.status == AuctionStatus::OfferAccepted,
                "offer not accepted"
            );
            let mut auction = self.auctions.get(auction_id).unwrap();
            assert!(auction.status == AuctionStatus::OfferAccepted);
            assert!(
                auction.accepted_offer == Some(offer_id),
                "this offer was not accepted"
            );
            auction.status = AuctionStatus::JobAccepted;
            offer.started_at = Some(now);
            self.offers.insert(offer_id, &offer);
        }

        #[ink(message)]
        pub fn deliver_job(&mut self, auction_id: u64, offer_id: u64) {
            let caller = self.env().caller();
            let now = self.env().block_timestamp();
            let attached_deposit = self.env().transferred_value();
            assert_eq!(attached_deposit, self.offer_deposit, "wrong deposit");
            assert!(self.offers.contains(offer_id), "offer not found");
            let mut offer = self.offers.get(offer_id).unwrap();
            assert!(offer.author == caller, "not autoher of the offer");
            assert!(
                offer.status == AuctionStatus::OfferAccepted,
                "offer not accepted"
            );
            let mut auction = self.auctions.get(auction_id).unwrap();
            assert!(auction.status == AuctionStatus::OfferAccepted);
            assert!(
                auction.accepted_offer == Some(offer_id),
                "this offer was not accepted"
            );
            auction.status = AuctionStatus::JobDelivered;
            offer.started_at = Some(now);
            self.offers.insert(offer_id, &offer);
        }

        #[ink(message)]
        pub fn confirm_job_delivery(
            &mut self,
            auction_id: u64,
            offer_id: u64,
            completed: bool,
        ) -> Result<()> {
            let caller = self.env().caller();
            let now = self.env().block_timestamp();
            let offer = self.offers.get(offer_id);
            let auction = self.auctions.get(auction_id);
            assert!(offer.is_some(), "offer not found");
            assert!(auction.is_some(), "auction not found");
            let mut a = auction.unwrap();
            let mut o = offer.unwrap();
            assert!(a.author == caller, "not author of the auction");
            assert!(
                a.status == AuctionStatus::JobDelivered,
                "offer not accepted"
            );
            assert!(
                a.accepted_offer == Some(offer_id),
                "this offer was not accepted"
            );
            a.status = AuctionStatus::Finalized;
            o.status = AuctionStatus::Finalized;
            o.delivered_at = Some(now);
            self.auctions.insert(auction_id, &a);
            self.offers.insert(offer_id, &o);
            self.env()
                .transfer(o.author, o.reward)
                .map_err(|_| Error::TransferFailed)?;
            Ok(())
        }

        #[ink(message)]
        pub fn create_offer(
            &mut self,
            description: String,
            duration: u64,
            reward: Balance,
            auction_id: u64,
        ) {
            //TODO: figure out how to handle storage deposit
            let caller = self.env().caller();
            let auction = Offer {
                author: caller,
                description,
                duration,
                reward,
                status: AuctionStatus::InProgress,
                accepted_at: None,
                started_at: None,
                delivered_at: None,
            };

            assert!(
                self.auctions.get(auction_id).is_some(),
                "auction does not exist"
            );

            assert!(
                self.auctions.get(auction_id).unwrap().expires_at > self.env().block_timestamp(),
                "auction is expired"
            );

            self.offers.insert(self.next_offer_id, &auction);
            let mut auction_offers = self.auction_offers.get(auction_id).unwrap_or(Vec::new());
            auction_offers.push(self.next_offer_id);
            self.auction_offers.insert(auction_id, &auction_offers);
            let mut user_offers = self.user_offers.get(caller).unwrap_or(Vec::new());
            user_offers.push(self.next_offer_id);
            self.user_offers.insert(caller, &user_offers);
            self.next_offer_id += 1;
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

        #[ink(message)]
        pub fn user_offers(&self, user: AccountId) -> Vec<Offer> {
            let mut results: Vec<Offer> = Vec::new();
            for i in self.user_offers.get(user).unwrap() {
                results.push(self.offers.get(i).unwrap());
            }
            results
        }

        #[ink(message)]
        pub fn auction_offers(&self, auction_id: u64) -> Vec<Offer> {
            let mut results: Vec<Offer> = Vec::new();
            for i in self.auction_offers.get(auction_id).unwrap() {
                results.push(self.offers.get(i).unwrap());
            }
            results
        }

        #[ink(message)]
        // Function to get paginated auctions in reversed order
        pub fn reversed_auctions(&self, from_index: u64, limit: u64) -> Vec<Auction> {
            let start_index = if from_index >= self.next_auction_id {
                self.next_auction_id - 1
            } else {
                from_index
            };

            let end_index = if start_index > limit {
                start_index - limit
            } else {
                0
            };

            let mut auctions_to_return: Vec<Auction> = Vec::new();

            for i in end_index + 1..=start_index {
                let auction = self.auctions.get(&i).expect("Auction not found");
                auctions_to_return.push(auction);
            }
            auctions_to_return.reverse();
            auctions_to_return
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
            assert!(!self.is_paused, "contract is paused");
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
            AMarketplace::new(admin, mediator, 10 * AZERO, 15 * AZERO, ONE_HOUR, ONE_HOUR)
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
        fn flow1() {
            let frank: ink::primitives::AccountId = get_default_test_accounts().frank;
            let mut contract = setup();
            set_caller(frank);
            set_deposit(10 * AZERO);

            contract.create_auction(
                "test name".to_string(),
                "test description".to_string(),
                vec!["test tag".to_string()],
            );

            let user_auctions = contract.user_auctions(frank);
            assert_eq!(user_auctions.len(), 1);
            assert_eq!(user_auctions[0].name, "test name");
            assert_eq!(user_auctions[0].description, "test description");
            assert_eq!(user_auctions[0].tags, vec!["test tag"]);

            contract.create_offer("test description".to_string(), ONE_HOUR, 200 * AZERO, 1);

            let user_offers = contract.user_offers(frank);
            assert_eq!(user_offers.len(), 1);
            assert_eq!(user_offers[0].reward, 200 * AZERO);
            assert_eq!(user_offers[0].duration, ONE_HOUR);
            assert_eq!(user_offers[0].description, "test description");
        }

        //TODO add full flow test
    }
}
