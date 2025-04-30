'use client'

import Link from 'next/link'

import { LogOut, Settings, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'

export const UserNav = () => {
  return (
    <div className='flex items-center gap-4'>
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='relative h-8 w-8 rounded-full'
          >
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src='/placeholder.svg?height=32&width=32'
                alt='@username'
              />
              <AvatarFallback>ИС</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
          forceMount
        >
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>Иван Смирнов</p>
              <p className='text-xs leading-none text-muted-foreground'>ivan.smirnov@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <Link
                href='/dashboard/profile'
                className='flex w-full'
              >
                Профиль
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              <Link
                href='/dashboard/settings'
                className='flex w-full'
              >
                Настройки
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className='mr-2 h-4 w-4' />
            <Link
              href='/login'
              className='flex w-full'
            >
              Выйти
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
