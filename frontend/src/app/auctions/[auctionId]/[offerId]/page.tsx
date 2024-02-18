'use client'

import { useAuction } from '@/api/useAuction'
import { useOffer } from '@/api/useOffer'
import { ContractIds } from '@/deployments/deployments'
import { AuctionStatus } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'lucide-react'
import toast from 'react-hot-toast'

import { AuctionDetails } from '@/components/auction/auction-details'
import { OfferListItem } from '@/components/offers/offer-list-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

interface JobDetailsPageParams {
  auctionId: string
  offerId: string
}

export default function JobDetails({
  params: { auctionId, offerId },
}: {
  params: JobDetailsPageParams
}) {
  const { activeAccount, activeSigner, api } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const queryClient = useQueryClient()

  const { data: auction, isLoading: isActionLoading } = useAuction(auctionId)
  const { data: offer, isLoading: isOfferLoading } = useOffer(offerId)

  const isJobOwner = activeAccount?.address === offer?.author
  const isAuctionOwner = activeAccount?.address === auction?.author
  const isJobDelivered = offer?.status === AuctionStatus.jobDelivered
  const isJobFinished = offer?.status === AuctionStatus.finalized

  const handleJobDelivery = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'deliverJob', {}, [
        auctionId,
        offerId,
      ])
      await queryClient.invalidateQueries({ queryKey: ['offers', offerId] })
    } catch (err) {
      console.warn(err)
    }
  }

  const handleAcceptJobDelivery = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'confirmJobDelivery', {}, [
        auctionId,
        offerId,
      ])
      await queryClient.invalidateQueries({ queryKey: ['offers', offerId] })
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isActionLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <AuctionDetails {...auction} hrefPrefix="/auctions">
          <CardContent className="flex w-full justify-center">
            <Button className="flex gap-x-2">
              <Link className="h-4 w-4" />
              Go to auction details
            </Button>
          </CardContent>
        </AuctionDetails>
      )}
      {/* Contact section */}
      {isOfferLoading ? (
        <Skeleton className="h-48 w-full" />
      ) : (
        <OfferListItem customHeader={isJobOwner ? 'Your offer' : undefined} {...offer} />
      )}
      <Card>
        {isJobOwner && (
          <CardHeader className="gap-3">
            <CardTitle className="flex flex-col gap-2">Your work</CardTitle>
            <CardDescription>
              {isJobDelivered
                ? 'Your work has been delivered. It needs to be accepted by other side'
                : isJobFinished
                  ? 'Your work has been accepted by the user. Reward was send to your account. '
                  : 'You can confirm that you submitted your work by clicking the button below '}
            </CardDescription>
            {!isJobDelivered && !isJobFinished && (
              <Button onClick={handleJobDelivery}>Deliver job</Button>
            )}
          </CardHeader>
        )}
        {isAuctionOwner && (
          <CardHeader className="gap-3">
            <CardTitle className="flex flex-col gap-2">Work status</CardTitle>
            <CardDescription>
              {isJobDelivered
                ? 'Work has been marked as delivered. Do you accept it?'
                : 'Work was not delivered yet'}
            </CardDescription>
            {isJobDelivered && (
              <div className="flex gap-4">
                <Button className="w-full" onClick={handleAcceptJobDelivery}>
                  Accept job delivery
                </Button>
              </div>
            )}
          </CardHeader>
        )}
      </Card>
    </div>
  )
}
