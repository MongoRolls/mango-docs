'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Navbar from './navbar'
import TemplatesGallery from './templates-gallery'

export default function Home() {
  const documents = useQuery(api.document.getDocuments)

  if (documents === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      <div className="mt-16">
        <TemplatesGallery />
        {documents && documents.map(document =>
          <span key={document._id}>{document.title}</span>)}
      </div>

    </div>
  )
}
