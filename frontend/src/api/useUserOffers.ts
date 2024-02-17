import { ContractIds } from '@/deployments/deployments'
import GreeterContract from '@inkathon/contracts/typed-contracts/contracts/greeter'
import { useInkathon, useRegisteredTypedContract } from '@scio-labs/use-inkathon'
import { useQuery } from '@tanstack/react-query'

export function useUserOffers() {
  const { isInitializing, isConnecting, activeAccount } = useInkathon()
  const { typedContract } = useRegisteredTypedContract(ContractIds.AConnect, GreeterContract)

  const fetchAuctions = async () => {
    if (typedContract && activeAccount) {
      const typedResult = await typedContract.query.userOffers(activeAccount?.address)
      return typedResult.value?.ok
    }
    return []
  }

  const queryResult = useQuery({
    queryKey: ['offers', activeAccount?.address],
    queryFn: fetchAuctions,
    enabled: !!typedContract && !!activeAccount,
  })

  return {
    ...queryResult,
    isLoading: isConnecting || isInitializing || queryResult.isLoading,
  }
}
