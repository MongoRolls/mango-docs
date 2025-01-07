import type { Doc } from '../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Building2Icon, CircleUserIcon, MoreVertical } from 'lucide-react'
import { SiGoogledocs } from 'react-icons/si'

interface DocumentRowProps {
  document: Doc<'documents'>
}

export function DocumentRow({ document }: DocumentRowProps) {
  return (
    <TableRow className="cursor-pointer hover:bg-muted">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="md:w-[45%] font-medium">
        {document.title}
      </TableCell>
      <TableCell className="text-muted-foreground md:flex hidden items-center gap-2">
        {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className="text-muted-foreground md:table-cell hidden">
        {format(document._creationTime, 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className="flex justify-end">
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
