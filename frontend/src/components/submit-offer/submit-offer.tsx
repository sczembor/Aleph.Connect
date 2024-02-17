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
}

export function SubmitOffer({ className }: SubmitOfferProps) {
  return (
    <Dialog>
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
          <SubmitOfferForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
