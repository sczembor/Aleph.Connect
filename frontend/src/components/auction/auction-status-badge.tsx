import { AuctionStatus } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'

import { Badge } from '@/components/ui/badge'

const STATUS_TEXT = {
  [AuctionStatus.conflict]: 'Conflict',
  [AuctionStatus.finalized]: 'Finalized',
  [AuctionStatus.inProgress]: 'In progress',
  [AuctionStatus.jobAccepted]: 'Accepted',
  [AuctionStatus.jobDelivered]: 'Delivered',
  [AuctionStatus.offerAccepted]: 'Waiting for other side acceptance',
} as const

const VARIANT = {
  [AuctionStatus.conflict]: 'destructive',
  [AuctionStatus.finalized]: 'secondary',
  [AuctionStatus.inProgress]: 'outline',
  [AuctionStatus.jobAccepted]: 'default',
  [AuctionStatus.jobDelivered]: 'secondary',
  [AuctionStatus.offerAccepted]: 'outline',
} as const

interface AuctionStatusBadgeProps {
  status: AuctionStatus
  customText?: string
}

export function AuctionStatusBadge({ status, customText }: AuctionStatusBadgeProps) {
  return (
    <Badge variant={VARIANT[status]} className="uppercase">
      {customText || STATUS_TEXT[status]}
    </Badge>
  )
}
