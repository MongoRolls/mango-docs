import type { Metadata } from 'next'
import { ConvexClientProvider } from '@/components/convex-client-provide'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

// 配置英文字体
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// 配置中文字体
const notoSansSC = Noto_Sans_SC({
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
      className={`${inter.className} ${notoSansSC.className}`}
    >
      <body>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
