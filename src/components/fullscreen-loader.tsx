'use client'

import dynamic from 'next/dynamic'

interface FullscreenLoaderProps {
  label?: string
}

const Metronome = dynamic(() =>
  import('ldrs').then((mod) => {
    mod.metronome.register()
    return () => (
      <l-metronome
        size="60"
        speed="1.2"
        color="black"
      />
    )
  }), {
  ssr: false,
})

export function FullscreenLoader({ label }: FullscreenLoaderProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <Metronome />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}
