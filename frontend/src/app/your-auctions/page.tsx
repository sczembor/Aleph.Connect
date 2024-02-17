'use client'

import { useUserAuctions } from '@/api/useUserAuctions'

import { AuctionList } from '@/components/auction/auction-list'
import { CreateAuction } from '@/components/create-auction/create-auction'

export interface MarketplaceListItemType {
  id: string
  name: string
  tags: string[]
  endDate: Date
  difficulty: 'HARD' | 'MEDIUM' | 'EASY'
  description: string
}

export default function Auctions() {
  const { data, isLoading } = useUserAuctions()
  const items = data || []

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Your auctions</h1>
          <CreateAuction />
        </div>
        <AuctionList items={items} isLoading={isLoading} />
      </div>
    </>
  )
}
