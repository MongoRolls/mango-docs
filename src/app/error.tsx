'use client'

import { FullscreenLoader } from '@/components/fullscreen-loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()

  useEffect(() => {
    // 可以在这里记录错误
    console.error(error)
  }, [error])

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">出错了</h1>
        <p className="text-muted-foreground text-sm">
          {error.message || '发生了一些错误，请稍后再试'}
        </p>
      </div>

      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          返回首页
        </Button>

        <Button
          onClick={() => reset()}
        >
          重试
        </Button>
      </div>
    </div>
  )
}

// 加载状态
export function Loading() {
  return <FullscreenLoader label="加载中..." />
}
