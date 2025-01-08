'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { templates } from '@/constants/templates'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'

export default function TemplatesGallery() {
  const router = useRouter()
  const create = useMutation(api.document.create)
  const [isCreate, setIsCreate] = useState(false)

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreate(true)
    create({
      title,
      initialContent,
    }).then((documentId) => {
      router.push(`/documents/${documentId}`)
    }).finally(() => {
      setIsCreate(false)
    })
  }

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-4">
        <h3 className="text-base font-medium">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {
              templates.map(template => (
                <CarouselItem
                  key={template.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]
                  pl-4"
                >
                  <div className={cn(
                    'aspect-[3/4] flex flex-col gap-y-2.5',
                    isCreate && 'pointer-events-none opacity-50',
                  )}
                  >
                    <button
                      type="button"
                      disabled={isCreate}
                      // todo: 需要优化
                      onClick={() => {
                        onTemplateClick(template.label, 'init')
                      }}
                      style={{
                        backgroundImage: `url(${template.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className={cn(
                        'size-full hover:border-blue-500  hover:bg-blue-50 rounded-sm border',
                        'transition flex flex-col gap-y-4 items-center justify-center bg-white',
                      )}
                    />
                    <p className="text-sm font-medium truncate">
                      {template.label}
                    </p>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
