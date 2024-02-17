import { SubstrateDeployment } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  AConnect = '5GQuS8KNCoPy1kCUUVP383C5iZVXu91Ur8gncTMJTne94q7a',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const networks = env.supportedChains
  const deployments: SubstrateDeployment[] = []

  // for (const networkId of networks) {
  //   for (const contractId of Object.values(ContractIds)) {
  //     const abi = await import(`@inkathon/contracts/deployments/greeter/greeter.json`)
  //     const { address } = await import(
  //       `@inkathon/contracts/deployments/greeter/alephzero-testnet.ts`
  //     )

  //     deployments.push({ contractId, networkId, abi, address })
  //   }
  // }

  const abi = await import(`@inkathon/contracts/deployments/greeter/greeter.json`)

  return [
    {
      contractId: ContractIds.AConnect,
      networkId: 'alephzero-testnet',
      abi,
      address: ContractIds.AConnect,
    },
  ]
}
