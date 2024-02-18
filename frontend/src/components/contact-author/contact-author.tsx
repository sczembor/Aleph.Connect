import { CONTACT_DETAILS } from '@/constants/contact'
import { AccountId } from '@inkathon/contracts/typed-contracts/types-arguments/greeter'
import { Github, Linkedin, Mail } from 'lucide-react'
import { RiTelegramLine } from 'react-icons/ri'

interface ContactAuthoProps {
  author: AccountId
}

export function ContactAuthor({ author }: ContactAuthoProps) {
  return (
    <div className="flex gap-8">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-muted-foreground/50 p-2">
          <Github className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">Github</p>
          <a
            className="text-sm text-muted-foreground underline"
            target="_blank"
            href={CONTACT_DETAILS[author as any].github}
          >
            Link
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-muted-foreground/50 p-2">
          <Linkedin className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">LinkedIn</p>
          <a
            className="text-sm text-muted-foreground underline"
            target="_blank"
            href={CONTACT_DETAILS[author as any].linkedin}
          >
            Link
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-muted-foreground/50 p-2">
          <RiTelegramLine className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">Telegram</p>
          <p className="text-sm text-muted-foreground underline">
            {CONTACT_DETAILS[author as any].telegram}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-muted-foreground/50 p-2">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">Mail</p>
          <p className="text-sm text-muted-foreground">{CONTACT_DETAILS[author as any].mail}</p>
        </div>
      </div>
    </div>
  )
}
