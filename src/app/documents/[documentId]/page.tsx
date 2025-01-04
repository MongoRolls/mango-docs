import { Editor } from '@/app/documents/[documentId]/editor'
import { Toolbar } from '@/app/documents/[documentId]/toolbar'

import Image from 'next/image'
import { Navbar } from './navbar'

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
async function DocumentIdPage({ params }: DocumentIdPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { documentId } = await params

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Navbar />
      <Toolbar />
      <Editor />
      <Image src="/logo.svg" alt="logo" width={10000} height={10000} />
    </div>
  )
}

export default DocumentIdPage
