import { ContractIds } from '@/deployments/deployments'
import GreeterContract from '@inkathon/contracts/typed-contracts/contracts/greeter'
import Methods from '@inkathon/contracts/typed-contracts/query/greeter'
import { useInkathon, useRegisteredTypedContract } from '@scio-labs/use-inkathon'
import { useQuery } from '@tanstack/react-query'

export function useAuction(...args: Parameters<Methods['auction']>) {
  const { isInitializing, isConnecting } = useInkathon()
  const { typedContract } = useRegisteredTypedContract(ContractIds.AConnect, GreeterContract)

  const fetchAuctions = async () => {
    if (typedContract) {
      const typedResult = await typedContract.query.auction(...args)
      return typedResult.value?.ok
    }
    return null
  }

  const queryResult = useQuery({
    queryKey: ['auctions'],
    queryFn: fetchAuctions,
    enabled: !!typedContract,
  })

  return {
    ...queryResult,
    isLoading: isConnecting || isInitializing || queryResult.isLoading,
  }
}
