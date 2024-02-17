'use client'

import { Suspense } from 'react'

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

export default function Marketplace() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <CreateAuction />
        </div>
        {/* TODO: Add filters */}
        <Suspense fallback="Loading..">
          <AuctionList />
        </Suspense>
      </div>
    </>
  )
}
