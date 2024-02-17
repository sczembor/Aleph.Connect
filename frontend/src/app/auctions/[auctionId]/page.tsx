import { AuctionDetails } from '@/components/auction/auction-details'
import { OfferListItem } from '@/components/offers/offer-list-item'
import { SubmitOffer } from '@/components/submit-offer/submit-offer'

import { MarketplaceListItemType } from '../page'

const auction: MarketplaceListItemType = {
  id: '1',
  name: 'Azero Marketplace UI+UX ',
  tags: ['UI/UX', 'Frontend', 'Development', 'Programming'],
  endDate: new Date(2024, 2, 19),
  difficulty: 'HARD',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
}

const offers = [
  {
    id: '1',
    estimation: 40,
    status: 'WAITING',
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
  },
  {
    id: '2',
    estimation: 80,
    status: 'ACCEPTED',
    reward: 75,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    owner: {
      id: '2',
      name: 'Andrew Golara',
      address: '',
      additionalData: {
        github: '',
        linkedin: '',
      },
    },
  },
  {
    id: '3',
    estimation: 10,
    status: 'DENIED',
    reward: 2000,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    owner: {
      id: '3',
      name: 'Robert Kubica',
      address: '',
      additionalData: {
        github: '',
        linkedin: '',
      },
    },
  },
] as const

export default function AuctionDetailsPage() {
  return (
    <div className="flex flex-col gap-4">
      <AuctionDetails {...auction} interactive={false} />
      <div>
        <div className="mx-6 flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Offers</h2>
          <SubmitOffer />
        </div>
      </div>
      {/* TODO: Add contact section */}
      <div>
        {!offers?.length && (
          <p className="ml-6 mt-4 w-full  text-muted-foreground">
            No offers yet. You can submit one using &quot;Submit offer&quot; button
          </p>
        )}
        <div className="grid grid-cols-3 gap-4">
          {offers.map((offer) => (
            <OfferListItem key={offer.id} authorName={offer.owner.name} {...offer} />
          ))}
        </div>
      </div>
    </div>
  )
}
