'use client'

import { useUserOffers } from '@/api/useUserOffers'
import { AuctionStatus } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'

import { JobItem } from '@/components/jobs/job-item'
import { Skeleton } from '@/components/ui/skeleton'

const jobStatuses = [AuctionStatus.jobAccepted, AuctionStatus.jobDelivered, AuctionStatus.finalized]

export default function Offers() {
  const { data, isLoading } = useUserOffers()

  const jobs = data?.filter((offer) => jobStatuses.includes(offer.status)) || []
  const offersToAccept = data?.filter((offer) => !jobStatuses.includes(offer.status)) || []

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
                  <JobItem key={item.id} {...item} />
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
                  <JobItem key={item.id} {...item} interactive />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
