'use client'

import { PropsWithChildren, useState } from 'react'

import { getDeployments } from '@/deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { env } from '@/config/environment'

export default function ClientProviders({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return (
    <UseInkathonProvider
      appName="ink!athon" // TODO
      connectOnInit={true}
      defaultChain={env.defaultChain}
      deployments={getDeployments()}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </UseInkathonProvider>
  )
}
