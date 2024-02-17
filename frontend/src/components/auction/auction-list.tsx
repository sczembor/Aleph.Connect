import { useAuctions } from '@/api/useAuctions'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { Skeleton } from '../ui/skeleton'
import { AuctionDetails } from './auction-details'

export function AuctionList() {
  const { data, isLoading } = useAuctions(10, 10)
  const items = data || []

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </>
        ) : (
          <>
            {!items?.length && (
              <p className="mt-4 w-full  text-muted-foreground">
                No auctions yet. You can submit one using &quot;Create auction&quot; button
              </p>
            )}
            {items.map((item) => (
              <AuctionDetails key={item.name} {...item} />
            ))}
          </>
        )}
      </div>
      <div>
        {/* TODO: Connect to query */}
        {!!items?.length && items.length > 10 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  )
}
