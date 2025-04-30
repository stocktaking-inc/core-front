'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Menu, Package2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: '/features',
      label: 'Возможности'
    },
    {
      href: '/pricing',
      label: 'Тарифы'
    },
    {
      href: '/documentation',
      label: 'Документация'
    },
    {
      href: '/about',
      label: 'О нас'
    },
    {
      href: '/login',
      label: 'Войти'
    },
    {
      href: '/register',
      label: 'Регистрация',
      isButton: true
    }
  ]

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='px-0 text-base hover:bg-transparent focus-visible:bg-transparent md:hidden'
        >
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='pr-0 sm:max-w-xs'
      >
        <div className='flex items-center gap-2 px-4 py-4'>
          <Package2 className='h-6 w-6' />
          <span className='font-bold'>Система инвентаризации</span>
          <div className='ml-auto flex items-center gap-2'>
            <ThemeToggle />
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
              onClick={() => setIsOpen(false)}
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Закрыть</span>
            </Button>
          </div>
        </div>
        <nav className='grid gap-2 px-2 py-4'>
          {routes.map(route =>
            route.isButton ? (
              <Button
                key={route.href}
                asChild
                className='w-full justify-start'
                onClick={() => setIsOpen(false)}
              >
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ) : (
              <Link
                key={route.href}
                href={route.href}
                className='flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent'
                onClick={() => setIsOpen(false)}
              >
                {route.label}
              </Link>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
