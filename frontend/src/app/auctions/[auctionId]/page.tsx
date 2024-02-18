'use client'

import { useAuction } from '@/api/useAuction'
import { useAuctionOffers } from '@/api/useAuctionOffers'
import { AuctionStatus } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'

import { AuctionDetails } from '@/components/auction/auction-details'
import { OfferListItem } from '@/components/offers/offer-list-item'
import { SubmitOffer } from '@/components/submit-offer/submit-offer'
import { CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface AuctionDetailsPageParams {
  auctionId: string
}

export default function AuctionDetailsPage({
  params: { auctionId },
}: {
  params: AuctionDetailsPageParams
}) {
  const { data: auction, isLoading: isActionLoading } = useAuction(auctionId)
  const { data: offers, isLoading: isOffersLoading } = useAuctionOffers(auctionId)

  return (
    <div className="flex flex-col gap-4">
      {isActionLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        auction && (
          <AuctionDetails {...auction} interactive={false}>
            <CardContent>
              <h4 className="mb-2 text-sm font-bold">Contact</h4>
              {/* <ContactAuthor author={auction.author} /> */}
            </CardContent>
          </AuctionDetails>
        )
      )}

      <div>
        <div className="mx-6 flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Offers</h2>
          <SubmitOffer auctionId={auctionId} />
        </div>
      </div>
      {/* TODO: Add contact section */}
      <div>
        {isOffersLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <>
            {!offers?.length && (
              <p className="ml-6 mt-4 w-full text-muted-foreground">
                No offers yet. You can submit one using &quot;Submit offer&quot; button
              </p>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {offers?.map((offer) => (
                <OfferListItem
                  key={offer.id}
                  auctionAuthor={auction?.author || ''}
                  linkActive={[
                    AuctionStatus.jobAccepted,
                    AuctionStatus.jobDelivered,
                    AuctionStatus.finalized,
                  ].includes(offer.status)}
                  {...offer}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
