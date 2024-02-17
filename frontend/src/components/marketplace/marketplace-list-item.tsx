'use client'

import { useRouter } from 'next/navigation'

import { formatDistance } from 'date-fns'
import { Calendar, Dumbbell } from 'lucide-react'

import { MarketplaceListItemType } from '@/app/marketplace/page'
import { Parameter } from '@/components/parameter/parameter'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface MarketplaceListItemProps extends MarketplaceListItemType {
  interactive?: boolean
}

export function MarketplaceListItem({
  id,
  name,
  tags,
  endDate,
  difficulty,
  description,
  interactive = true,
}: MarketplaceListItemProps) {
  const router = useRouter()
  const redirectToAuctions = () => {
    router.push(`marketplace/${id}`)
  }

  return (
    <Card
      className={interactive ? 'hover:cursor-pointer hover:bg-gray-200/5' : undefined}
      onClick={interactive ? redirectToAuctions : undefined}
    >
      <CardHeader className="gap-3">
        <CardTitle className="flex flex-col gap-2">
          {name}
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardTitle>
        <div className="flex flex-col gap-1">
          <Parameter icon={Calendar} title="Ends in" value={formatDistance(new Date(), endDate)} />
          <Parameter icon={Dumbbell} title="Difficulty:" value={difficulty} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
