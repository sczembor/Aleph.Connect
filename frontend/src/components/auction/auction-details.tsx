'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { AuctionView } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { formatDistance } from 'date-fns'
import { Calendar, Dumbbell } from 'lucide-react'

import { Parameter } from '@/components/parameter/parameter'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface AuctionDetailsProps extends AuctionView, PropsWithChildren {
  endDate?: Date
  difficulty?: 'HARD' | 'MEDIUM' | 'EASY'
  interactive?: boolean
  hrefPrefix?: string
}

export function AuctionDetails({
  id,
  name,
  tags = [],
  endDate = new Date(),
  difficulty = 'MEDIUM',
  description,
  interactive = true,
  hrefPrefix = 'auctions',
  children,
}: AuctionDetailsProps) {
  const router = useRouter()
  const redirectToAuctions = () => {
    router.push(`${hrefPrefix}/${id}`)
  }

  return (
    <Card
      className={interactive ? 'hover:cursor-pointer hover:bg-gray-200/5' : undefined}
      onClick={interactive ? redirectToAuctions : undefined}
    >
      <CardHeader className="gap-3">
        <CardTitle className="flex flex-col gap-2">
          {name}
          <div className="flex gap-2 overflow-x-auto">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardTitle>
        <div className="flex flex-col gap-1">
          <Parameter icon={Calendar} title="Ends in" value={formatDistance(new Date(), endDate)} />
          <Parameter icon={Dumbbell} title="Difficulty:" value={difficulty} />
        </div>
        <CardDescription className="overflow-auto">{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  )
}
