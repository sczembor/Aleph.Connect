import Image from 'next/image'
import Link from 'next/link'

import logo from 'public/images/logo.png'

import { cn } from '@/utils/cn'

import { ConnectButton } from '../web3/connect-button'

export function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn('flex items-center justify-between px-12 py-2', className)} {...props}>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Image src={logo} priority height={32} alt="App logo" />
        <Link href="/auctions" className="text-sm font-medium transition-colors hover:text-primary">
          Auctions
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </div>
  )
}
