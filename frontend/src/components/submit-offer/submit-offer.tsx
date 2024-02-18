import { useState } from 'react'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { SubmitOfferForm } from './sumit-offer-form'

interface SubmitOfferProps {
  className?: string
  auctionId: string
}

export function SubmitOffer({ auctionId }: SubmitOfferProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <span className="flex items-center gap-2">
            Submit offer
            <Plus />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Submit your offer</DialogTitle>
          <SubmitOfferForm auctionId={auctionId} onSuccess={() => setDialogOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
