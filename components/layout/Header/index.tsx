import Link from 'next/link'

import { Package2 } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'

import { MobileMenu } from '@/components/mobile-menu'
import { Button } from '@/components/ui/button'

export const Header = ({ navLinks }: { navLinks: { href: string; label: string }[] }) => {
  return (
    <header className='sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background px-4'>
      <div className='flex items-center gap-2'>
        <MobileMenu />
        <Package2 className='h-6 w-6' />
        <span className='font-bold'>Система инвентаризации</span>
      </div>
      <nav className='hidden gap-6 md:flex'>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className='text-sm font-medium text-muted-foreground hover:text-primary'
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <div className='hidden items-center gap-4 md:flex'>
          <a
            href='https://stocktaking-auth.vercel.app/login'
            className='text-sm font-medium text-muted-foreground hover:text-primary'
          >
            Войти
          </a>
          <Button
            asChild
            size='sm'
          >
            <a href='https://stocktaking-auth.vercel.app/register'>Регистрация</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
