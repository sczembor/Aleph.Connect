import { ContractIds } from '@/deployments/deployments'
import GreeterContract from '@inkathon/contracts/typed-contracts/contracts/greeter'
import Methods from '@inkathon/contracts/typed-contracts/query/greeter'
import { useInkathon, useRegisteredTypedContract } from '@scio-labs/use-inkathon'
import { useQuery } from '@tanstack/react-query'

export function useAuctionOffers(...args: Parameters<Methods['auctionOffers']>) {
  const { isInitializing, isConnecting, activeAccount } = useInkathon()
  const { typedContract } = useRegisteredTypedContract(ContractIds.AConnect, GreeterContract)

  const fetchAuctionOffers = async () => {
    if (typedContract && activeAccount) {
      const typedResult = await typedContract.query.auctionOffers(...args)
      return typedResult.value?.ok
    }
    return []
  }

  const queryResult = useQuery({
    queryKey: ['offers', activeAccount?.address, args],
    queryFn: fetchAuctionOffers,
    enabled: !!typedContract && !!activeAccount,
  })

  return {
    ...queryResult,
    isLoading: isConnecting || isInitializing || queryResult.isLoading,
  }
}
