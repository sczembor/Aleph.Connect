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

import { CreateAuctionForm } from './create-auction-form'

export function CreateAuction() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <span className="flex items-center gap-2">
            Create auction
            <Plus />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create new auction</DialogTitle>
          <CreateAuctionForm onSuccess={() => setDialogOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
