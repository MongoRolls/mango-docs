import type { Doc } from '../../../convex/_generated/dataModel'
import { TableCell, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SiGoogledocs } from 'react-icons/si'
import { DocumentMenu } from './document-menu'

interface DocumentRowProps {
  // 注释：DOC是Convex的类型，表示文档
  document: Doc<'documents'>
}

export function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter()

  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, '_blank')
  }

  const onRowClick = (id: string) => {
    router.push(`/documents/${id}`)
  }

  return (
    <TableRow className="cursor-pointer" onClick={() => onRowClick(document._id)}>
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
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}
