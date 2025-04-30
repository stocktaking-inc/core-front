'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { NAV_ITEMS } from './constants'

export const DashboardNav = () => {
  const pathname = usePathname()

  return (
    <nav className='grid items-start gap-2'>
      {NAV_ITEMS.map(item => {
        const isActive =
          pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard')

        return (
          <Link
            key={item.title}
            href={item.href}
          >
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                isActive ? 'bg-accent' : 'transparent'
              )}
            >
              <item.icon className='mr-2 h-4 w-4' />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
