import Link from 'next/link'

import { Package2 } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'

export const MainNav = () => {
  return (
    <div className='flex items-center gap-6 md:gap-10 px-6'>
      <Link
        href='/dashboard'
        className='flex items-center space-x-2'
      >
        <Package2 className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>Система инвентаризации</span>
      </Link>
      <div className='ml-auto md:hidden'>
        <ThemeToggle />
      </div>
    </div>
  )
}
