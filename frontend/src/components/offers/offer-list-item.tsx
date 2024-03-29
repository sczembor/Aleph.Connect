'use client'

import { useRouter } from 'next/navigation'

import { CONTACT_DETAILS } from '@/constants/contact'
import { TZERO_MULTIPLIER } from '@/constants/tzero-multiplier'
import { ContractIds } from '@/deployments/deployments'
import {
  AccountId,
  AuctionStatus,
  OfferView,
} from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { useInkathon, useRegisteredContract } from '@scio-labs/use-inkathon'
import { useQueryClient } from '@tanstack/react-query'
import { HandCoins, Info, Timer } from 'lucide-react'
import toast from 'react-hot-toast'

import { cn } from '@/utils/cn'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'

import { AcceptDenyFooter } from '../accept-deny-footer/accept-deny-footer'
import { AuctionStatusBadge } from '../auction/auction-status-badge'
import { Parameter } from '../parameter/parameter'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface OfferListItemProps extends OfferView {
  auctionAuthor?: AccountId
  className?: string
  customHeader?: string
  linkActive?: boolean
}

export function OfferListItem({
  id,
  className,
  duration,
  author,
  auctionAuthor = '',
  description,
  reward,
  auctionId,
  status,
  customHeader,
  linkActive,
}: OfferListItemProps) {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.AConnect)

  const router = useRouter()
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
        { value: +reward },
        [auctionId, id],
      )
      await queryClient.invalidateQueries({ queryKey: ['offers'] })
    } catch (err) {
      console.warn(err)
    }
  }
  const handleDenyOffer = () => {}

  const redirectToJob = () => {
    router.push(`/auctions/${auctionId}/${id}`)
  }

  return (
    <Card
      className={cn(
        isDenied ? '!text-muted-foreground' : undefined,
        linkActive ? 'hover:cursor-pointer hover:bg-gray-200/5' : undefined,
        className,
      )}
      onClick={linkActive ? redirectToJob : undefined}
    >
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 break-all">
          {/* temporary contact mock */}
          {customHeader || `${CONTACT_DETAILS[author]?.name || author}'s offer`}
          <div>
            <AuctionStatusBadge status={status} />
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
      {isAuctionOwner && status === AuctionStatus.inProgress && (
        <>
          <div className="mb-4 px-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Caution</AlertTitle>
              <AlertDescription>
                By accepting the offer you will be charged with reward. If the other side
                doesn&apos;t accept the offer you will be able to reclaim it later
              </AlertDescription>
            </Alert>
          </div>
          <AcceptDenyFooter onAccept={handleAcceptOffer} onDeny={handleDenyOffer} />
        </>
      )}
    </Card>
  )
}
