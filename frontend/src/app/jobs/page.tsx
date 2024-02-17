'use client'

import { AcceptDenyFooter } from '@/components/accept-deny-footer/accept-deny-footer'
import { AuctionDetails } from '@/components/auction/auction-details'

import { MarketplaceListItemType } from '../marketplace/page'

const items: MarketplaceListItemType[] = [
  {
    id: '1',
    name: 'Azero Marketplace UI+UX ',
    tags: ['UI/UX', 'Frontend', 'Development', 'Programming'],
    endDate: new Date(2024, 2, 19),
    difficulty: 'HARD',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
]

export default function Jobs() {
  const handleAcceptJob = () => {}
  const handleDenyJob = () => {}

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Waiting for acceptance</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {!items?.length && (
              <p className="w-full  text-muted-foreground">No jobs waiting for acceptance</p>
            )}
            {items.map((item) => (
              <AuctionDetails key={item.name} {...item} interactive={false}>
                <AcceptDenyFooter onAccept={handleAcceptJob} onDeny={handleDenyJob} />
              </AuctionDetails>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Your jobs</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {!items?.length && (
              <p className=" w-full  text-muted-foreground">
                No jobs yet. Check available auctions
              </p>
            )}
            {items.map((item) => (
              <AuctionDetails key={item.name} {...item} hrefPrefix="jobs" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
