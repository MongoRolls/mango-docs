import type { PaginationStatus } from 'convex/react'
import type { Doc } from '../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LoaderIcon } from 'lucide-react'
import { DocumentRow } from './document-row'

interface DocumentsTableProps {
  documents: Doc<'documents'>[] | undefined
  status: PaginationStatus
  loadMore: (numItems: number) => void
}

export function DocumentsTable({
  documents,
  status,
  loadMore,
}: DocumentsTableProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {
            documents.length === 0 ? (
              <TableBody>
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                    No documents found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {documents.map(document => (
                  <DocumentRow key={document._id} document={document} />
                ))}
              </TableBody>
            )
          }
        </Table>
      )}

      <div className="flex justify-center items-center">
        <Button
          variant="ghost"
          disabled={status !== 'CanLoadMore'}
          size="sm"
          onClick={() => loadMore(5)}
        >
          {status === 'CanLoadMore' ? 'Load more' : 'End of results'}
        </Button>
      </div>
    </div>
  )
}
