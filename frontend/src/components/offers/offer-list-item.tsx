'use client'

import { TZERO_MULTIPLIER } from '@/constants/tzero-multiplier'
import { ContractIds } from '@/deployments/deployments'
import {
  AccountId,
  AuctionStatus,
  OfferView,
} from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { useQueryClient } from '@tanstack/react-query'
import { HandCoins, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

import { cn } from '@/utils/cn'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import { AcceptDenyFooter } from '../accept-deny-footer/accept-deny-footer'
import { AuctionStatusBadge } from '../auction/auction-status-badge'
import { Parameter } from '../parameter/parameter'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface OfferListItemProps extends OfferView {
  authorName?: string
  auctionAuthor: AccountId
  auctionId?: string
  className?: string
  customHeader?: string
}

export function OfferListItem({
  id,
  className,
  duration,
  authorName = '',
  auctionAuthor,
  description,
  reward,
  auctionId,
  status,
  customHeader,
}: OfferListItemProps) {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const queryClient = useQueryClient()

  const isDenied = false
  const isAuctionOwner = auctionAuthor === activeAccount?.address

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
        'acceptOffer',
        { value: +reward * TZERO_MULTIPLIER },
        [auctionId, id],
      )
      await queryClient.invalidateQueries({ queryKey: ['offers'] })
    } catch (err) {
      console.warn(err)
    }
  }
  const handleDenyOffer = () => {}

  return (
    <Card className={cn(isDenied ? '!text-muted-foreground' : undefined, className)}>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 break-all">
          {customHeader || `${authorName}'s offer`}
          <div>
            <AuctionStatusBadge status={status} />
          </div>
        </CardTitle>
        <div className="text-sm">
          <Parameter icon={Timer} title="Estimation:" value={`${duration}h`} />
          <Parameter icon={HandCoins} title="Reward:" value={`${reward} TZERO`} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      {isAuctionOwner && status === AuctionStatus.inProgress && (
        <AcceptDenyFooter onAccept={handleAcceptOffer} onDeny={handleDenyOffer} />
      )}
    </Card>
  )
}
