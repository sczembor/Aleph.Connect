import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

interface AcceptDenyFooterProps {
  onAccept: () => void
  onDeny: () => void
}

export function AcceptDenyFooter({ onAccept, onDeny }: AcceptDenyFooterProps) {
  return (
    <CardFooter className="space-x-4">
      <Button className="w-full" onClick={onAccept}>
        Accept
        <Check className="ml-1" />
      </Button>
      <Button variant="secondary" className="w-full" onClick={onDeny}>
        Deny
        <X className="ml-1" />
      </Button>
    </CardFooter>
  )
}
