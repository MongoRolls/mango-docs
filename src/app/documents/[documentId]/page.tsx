/* eslint-disable unused-imports/no-unused-vars */
import { Editor } from '@/app/documents/[documentId]/editor'
import { Toolbar } from '@/app/documents/[documentId]/toolbar'

import { Navbar } from './navbar'

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div
        className="flex flex-col px-4 py-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfc] print:hidden"
      >
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  )
}

export default DocumentIdPage
