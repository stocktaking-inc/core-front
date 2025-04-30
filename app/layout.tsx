import type React from 'react'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Система инвентаризации | Эффективное управление запасами',
  description:
    'Комплексная система управления инвентаризацией для логистических и торговых компаний',
  keywords: 'инвентаризация, управление запасами, логистика, склад, товары, поставщики, заказы'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='ru'
      className='light'
      style={{ colorScheme: 'light' }}
    >
      <body className={inter.className + ' flex flex-col min-h-screen'}>
        <Providers
          attribute='class'
          defaultTheme='system'
        >
          <div className='flex flex-1'>
            <main className='flex-1'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
