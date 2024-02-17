'use client'

import { HandCoins, Timer } from 'lucide-react'

import { cn } from '@/utils/cn'

import { AcceptDenyFooter } from '../accept-deny-footer/accept-deny-footer'
import { Parameter } from '../parameter/parameter'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface OfferListItemProps {
  authorName: string
  estimation: number
  reward: number
  message: string
  status: 'WAITING' | 'ACCEPTED' | 'DENIED'
  className?: string
  customHeader?: string
}

export function OfferListItem({
  className,
  authorName = '',
  estimation,
  reward,
  message,
  status,
  customHeader,
}: OfferListItemProps) {
  const isDenied = status === 'DENIED'
  const isAuctionOwner = true

  const handleAcceptOffer = () => {}
  const handleDenyOffer = () => {}

  const badgeVariant = isDenied ? 'destructive' : status === 'ACCEPTED' ? 'default' : 'outline'

  return (
    <Card className={cn(isDenied ? '!text-muted-foreground' : undefined, className)}>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          {customHeader || `${authorName}'s offer`}
          <div>
            <Badge variant={badgeVariant} className="uppercase">
              {status}
            </Badge>
          </div>
        </CardTitle>
        <div className="text-sm">
          <Parameter icon={Timer} title="Estimation:" value={`${estimation}h`} />
          <Parameter icon={HandCoins} title="Reward:" value={`${reward} AZERO`} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
      {isAuctionOwner && status === 'WAITING' && (
        <AcceptDenyFooter onAccept={handleAcceptOffer} onDeny={handleDenyOffer} />
      )}
    </Card>
  )
}
