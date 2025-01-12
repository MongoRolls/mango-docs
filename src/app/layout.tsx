import type { Metadata } from 'next'
import { ConvexClientProvider } from '@/components/convex-client-provide'
import { Toaster } from '@/components/ui/sonner'
import { Inter, Montserrat } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import '@liveblocks/react-ui/styles.css'
import '@liveblocks/react-tiptap/styles.css'
import './globals.css'

// 配置英文字体
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mango Docs',
  description: '现代化文档协作平台',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${montserrat.className} ${inter.className}`}
    >
      <body>
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
