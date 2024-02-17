import { Viewport } from 'next'
import { PropsWithChildren } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { ToastConfig } from '@/app/toast-config'
import { Navbar } from '@/components/navbar/navbar'
import { Separator } from '@/components/ui/separator'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'

import './globals.css'
import ClientProviders from './providers'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

// export const metadata: Metadata = {
//   title: 'ink!athon Boilerplate',
//   description: 'Full-Stack DApp Boilerplate for ink! Smart Contracts',
//   metadataBase: new URL(env.url),
//   robots: env.isProduction ? 'all' : 'noindex,nofollow',
//   openGraph: {
//     type: 'website',
//     locale: 'en',
//     url: env.url,
//     siteName: 'ink!athon Boilerplate',
//     images: [
//       {
//         url: '/images/inkathon-og-banner.jpg',
//         width: 1280,
//         height: 640,
//       },
//     ],
//   },
//   twitter: {
//     site: '@scio_xyz',
//     creator: '@scio_xyz',
//     card: 'summary_large_image',
//   },
// }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn('dark', GeistSans.variable, GeistMono.variable)}>
      <body>
        <ClientProviders>
          <div>
            <Navbar />
            <Separator />
            <div className="px-20 py-12">{children}</div>
          </div>
          <ToastConfig />
        </ClientProviders>

        {!!env.isProduction && <Analytics />}
      </body>
    </html>
  )
}
