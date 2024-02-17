'use client'

import { useUserOffers } from '@/api/useUserOffers'
import { AuctionStatus } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'

import { AcceptDenyFooter } from '@/components/accept-deny-footer/accept-deny-footer'
import { AuctionDetails } from '@/components/auction/auction-details'
import { Skeleton } from '@/components/ui/skeleton'

import { MarketplaceListItemType } from '../auctions/page'

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

const jobStatuses = [AuctionStatus.jobAccepted, AuctionStatus.jobDelivered, AuctionStatus.finalized]

export default function Offers() {
  const { data, isLoading } = useUserOffers()

  const jobs = data?.filter((offer) => jobStatuses.includes(offer.status)) || []
  const offersToAccept = data?.filter((offer) => !jobStatuses.includes(offer.status)) || []

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
            {isLoading ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : (
              <>
                {!offersToAccept?.length && (
                  <p className="w-full  text-muted-foreground">No jobs waiting for acceptance</p>
                )}
                {offersToAccept.map((item) => (
                  <AuctionDetails key={item.name} {...item} interactive={false}>
                    <AcceptDenyFooter onAccept={handleAcceptJob} onDeny={handleDenyJob} />
                  </AuctionDetails>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Your jobs</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : (
              <>
                {!jobs?.length && (
                  <p className=" w-full  text-muted-foreground">
                    No jobs yet. Check available auctions
                  </p>
                )}
                {jobs.map((item) => (
                  <AuctionDetails key={item.name} {...item} hrefPrefix="jobs" />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
