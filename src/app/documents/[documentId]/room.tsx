'use client'

import type { ReactNode } from 'react'
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

export function Room({ children }: { children: ReactNode }) {
  const params = useParams()

  return (
    <LiveblocksProvider publicApiKey="pk_dev_scJNcD4VE1oXIyJexWbb2ayuQKnx4mjMcDDpeNpQ_6ywP85iFi5mI7Fmy7RjhR45">
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
