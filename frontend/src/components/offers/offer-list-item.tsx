'use client'

import { Check, HandCoins, Timer, X } from 'lucide-react'

import { cn } from '@/utils/cn'

import { Parameter } from '../parameter/parameter'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface OfferListItemProps {
  authorName: string
  estimation: number
  reward: number
  message: string
  status: 'WAITING' | 'ACCEPTED' | 'DENIED'
  className?: string
}

export function OfferListItem({
  className,
  authorName,
  estimation,
  reward,
  message,
  status,
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
          {authorName}&apos;s offer
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
        <CardFooter className="space-x-4">
          <Button className="w-full" onClick={handleAcceptOffer}>
            Accept
            <Check className="ml-1" />
          </Button>
          <Button variant="secondary" className="w-full" onClick={handleDenyOffer}>
            Deny
            <X className="ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
