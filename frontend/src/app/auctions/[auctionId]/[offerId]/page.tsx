import { Link } from 'lucide-react'

import { MarketplaceListItemType } from '@/app/auctions/page'
import { AuctionDetails } from '@/components/auction/auction-details'
import { OfferListItem } from '@/components/offers/offer-list-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const auction: MarketplaceListItemType = {
  id: '1',
  name: 'Azero Marketplace UI+UX ',
  tags: ['UI/UX', 'Frontend', 'Development', 'Programming'],
  endDate: new Date(2024, 2, 19),
  difficulty: 'HARD',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
}

const offer = {
  id: '1',
  estimation: 40,
  status: 'ACCEPTED',
  reward: 200,
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  owner: {
    id: '1',
    name: 'test',
    address: '',
    additionalData: {
      github: '',
      linkedin: '',
    },
  },
}

export default function JobDetails() {
  return (
    <div className="flex flex-col gap-4">
      <AuctionDetails {...auction} hrefPrefix="/marketplace">
        <CardContent className="flex w-full justify-center">
          <Button className="flex gap-x-2">
            <Link className="h-4 w-4" />
            Go to auction details
          </Button>
        </CardContent>
      </AuctionDetails>
      {/* Contact section */}
      <OfferListItem authorName={offer.owner.name} customHeader="Your offer" {...offer} />
      <Card>
        <CardHeader className="gap-3">
          <CardTitle className="flex flex-col gap-2">Your work</CardTitle>
          <Button>Deliver job</Button>
        </CardHeader>
      </Card>
    </div>
  )
}
