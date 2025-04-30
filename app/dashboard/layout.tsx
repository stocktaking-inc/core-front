import type React from 'react'

import { DashboardNav, MainNav, UserNav } from './components/NAVIGATION'

import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className='flex justify-between items-center h-16 sticky top-0 z-40 w-full border-b bg-background px-4'>
        <MainNav />
        <div className='flex items-center gap-4'>
          <UserNav />
        </div>
      </header>
      <div className='grid flex-1 gap-12 md:grid-cols-[200px_1fr] px-6'>
        <aside className='hidden w-[200px] flex-col md:flex mt-6'>
          <DashboardNav />
        </aside>
        <main className='flex w-full flex-1 flex-col overflow-hidden py-6'>{children}</main>
      </div>
      <Toaster />
    </>
  )
}
