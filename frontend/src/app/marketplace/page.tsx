import { CreateAuction } from '@/components/create-auction/create-auction'
import { MarketplaceListItem } from '@/components/marketplace/marketplace-list-item'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface MarketplaceListItemType {
  id: string
  name: string
  tags: string[]
  endDate: Date
  difficulty: 'HARD' | 'MEDIUM' | 'EASY'
  description: string
}

const items: MarketplaceListItemType[] = [
  {
    id: '1',
    name: 'Azero Marketplace UI+UX ',
    tags: ['UI/UX', 'Frontend', 'Development', 'Programming'],
    endDate: new Date(2024, 2, 19),
    difficulty: 'HARD',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '2',
    name: 'Azero Marketplace Backend',
    tags: ['Backend', 'Databases', 'Development', 'Programming'],
    endDate: new Date(2024, 3, 24),
    difficulty: 'MEDIUM',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '3',
    name: 'Small project fullstach implementation',
    tags: ['Frontend', 'Backend', 'Fullstack', 'Development', 'Programming'],
    endDate: new Date(2024, 1, 20),
    difficulty: 'EASY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    id: '4',
    name: 'Security review with report',
    tags: ['Security', 'Banking', 'Audit'],
    endDate: new Date(2024, 3, 19),
    difficulty: 'HARD',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
]

export default function Marketplace() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <CreateAuction />
        </div>
        {/* TODO: Add filters */}
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <MarketplaceListItem key={item.name} {...item} />
          ))}
        </div>
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
      </div>
    </>
  )
}
