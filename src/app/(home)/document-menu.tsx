import type { Id } from '../../../convex/_generated/dataModel'
import { RemoveDialog } from '@/components/remove-dialog'
import { RenameDialog } from '@/components/rename-dialog'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExternalLink, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react'

interface DocumentMenuProps {
  documentId: Id<'documents'>
  title: string
  onNewTab: (id: string) => void
}

export function DocumentMenu({ documentId, title, onNewTab }: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>

        <RenameDialog documentId={documentId}>
          <DropdownMenuItem onClick={e => e.stopPropagation()} onSelect={e => e.preventDefault()}>
            <FilePenIcon className="size-4 mr-2" />
            <span>Rename</span>
          </DropdownMenuItem>
        </RenameDialog>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={e => e.preventDefault()}
            onClick={e => e.stopPropagation()}
          >
            <TrashIcon className="size-4 mr-2" />
            <span>Remove</span>
          </DropdownMenuItem>
        </RemoveDialog>

        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLink className="size-4 mr-2" />
          <span>Open in new tab</span>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
