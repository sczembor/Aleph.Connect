import { SubstrateDeployment } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Greeter = 'greeter',
  AConnect = '5FPmDxLWr9tXfwkmvP6KHtj2q4Qdf9j1xbLPyBZFBnEsDZhV',
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
      contractId: '5FPmDxLWr9tXfwkmvP6KHtj2q4Qdf9j1xbLPyBZFBnEsDZhV',
      networkId: 'alephzero-testnet',
      abi,
      address: '5FPmDxLWr9tXfwkmvP6KHtj2q4Qdf9j1xbLPyBZFBnEsDZhV',
    },
  ]
}
