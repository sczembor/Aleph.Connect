import { LucideIcon } from 'lucide-react'

interface ParameterProps {
  icon: LucideIcon
  title: string
  value: string
}

export function Parameter({ icon: Icon, title, value }: ParameterProps) {
  return (
    <div className="flex  items-center gap-2">
      <Icon className="h-4 w-4" />
      <span className="flex items-center gap-1 text-sm">
        <p className="font-bold">{title}</p> {value}
      </span>
    </div>
  )
}
