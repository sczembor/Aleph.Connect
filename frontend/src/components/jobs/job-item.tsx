'use client'

import { useRouter } from 'next/navigation'

import { TZERO_MULTIPLIER } from '@/constants/tzero-multiplier'
import { ContractIds } from '@/deployments/deployments'
import {
  AuctionStatus,
  OfferView,
} from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowRight, HandCoins, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import { AcceptDenyFooter } from '../accept-deny-footer/accept-deny-footer'
import { AuctionStatusBadge } from '../auction/auction-status-badge'
import { Parameter } from '../parameter/parameter'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface JobItemProps extends OfferView {
  className?: string
  customHeader?: string
  interactive?: boolean
}

export function JobItem({
  id,
  duration,
  description,
  reward,
  auctionId,
  status,
  interactive,
}: JobItemProps) {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const router = useRouter()

  const queryClient = useQueryClient()

  const handleAcceptOffer = async () => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }
    try {
      await contractTxWithToast(
        api,
        activeAccount.address,
        contract,
        'acceptJob',
        { value: 1 * TZERO_MULTIPLIER },
        [auctionId, id],
      )
      await queryClient.invalidateQueries({ queryKey: ['offers', activeAccount.address] })
    } catch (err) {
      console.warn(err)
    }
  }
  const handleDenyOffer = () => {}

  const redirectToAuction = () => {
    router.push(`/auctions/${auctionId}`)
  }

  const redirectToJobDetails = () => {
    router.push(`/auctions/${auctionId}/${id}`)
  }

  return (
    <Card
      className={interactive ? 'hover:cursor-pointer hover:bg-gray-200/5' : undefined}
      onClick={interactive ? redirectToJobDetails : undefined}
    >
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 break-all">
          <div className="flex items-center justify-between">
            {`Offer for ${auctionId}`}
            <Button variant="secondary" className="flex gap-x-2" onClick={redirectToAuction}>
              Go to auction details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <AuctionStatusBadge
              status={status}
              customText={
                status === AuctionStatus.offerAccepted ? 'Waiting for your acceptance' : undefined
              }
            />
          </div>
        </CardTitle>
        <div className="text-sm">
          <Parameter icon={Timer} title="Estimation:" value={`${duration}h`} />
          <Parameter
            icon={HandCoins}
            title="Reward:"
            value={`${+reward / TZERO_MULTIPLIER} TZERO`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      {status === AuctionStatus.offerAccepted && (
        <AcceptDenyFooter onAccept={handleAcceptOffer} onDeny={handleDenyOffer} />
      )}
    </Card>
  )
}
