import { LoaderIcon } from 'lucide-react'

interface FullscreenLoaderProps {
  label?: string
}

export function FullscreenLoader({ label }: FullscreenLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}
