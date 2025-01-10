import { metronome } from 'ldrs'

metronome.register()

interface FullscreenLoaderProps {
  label?: string
}

export function FullscreenLoader({ label }: FullscreenLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">

      <div className="mb-1">
        <l-metronome
          size="60"
          speed="1.2"
          color="black"
        />
      </div>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}
