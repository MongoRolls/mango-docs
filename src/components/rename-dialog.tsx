'use client'

import type { Id } from '../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { api } from '../../convex/_generated/api'

interface RenameDialogProps {
  documentId: Id<'documents'>
  initialTitle: string
  children: React.ReactNode
}

export function RenameDialog({ documentId, initialTitle, children }: RenameDialogProps) {
  const update = useMutation(api.document.updateById)
  const [isUpdating, setIsUpdating] = useState(false)

  const [title, setTitle] = useState(initialTitle)
  const [open, setOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    update({ id: documentId, title: title.trim() || 'Untitled' })
      .then(() => {
        setOpen(false)
        toast.success('document renamed')
      })
      .catch(() => {
        toast.error('something wrong ')
      })
      .finally(() => {
        setIsUpdating(false)
      })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Document name"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              type="submit"
              onClick={e => e.stopPropagation()}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
