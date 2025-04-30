'use client'

import type React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'

export const SecuritySettings = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: 'Пароль изменен',
        description: 'Ваш пароль был успешно обновлен.'
      })

      const form = e.target as HTMLFormElement
      form.reset()
    }, 1000)
  }

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    toast({
      title: twoFactorEnabled
        ? 'Двухфакторная аутентификация отключена'
        : 'Двухфакторная аутентификация включена',
      description: twoFactorEnabled
        ? 'Двухфакторная аутентификация была отключена для вашего аккаунта.'
        : 'Двухфакторная аутентификация была включена для вашего аккаунта.'
    })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Изменение пароля</h3>
        <p className='text-sm text-muted-foreground'>
          Обновите ваш пароль для повышения безопасности аккаунта.
        </p>
        <form
          onSubmit={handlePasswordChange}
          className='mt-4 space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='current-password'>Текущий пароль</Label>
            <Input
              id='current-password'
              type='password'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='new-password'>Новый пароль</Label>
            <Input
              id='new-password'
              type='password'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirm-password'>Подтвердите новый пароль</Label>
            <Input
              id='confirm-password'
              type='password'
              required
            />
          </div>
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Изменить пароль'}
          </Button>
        </form>
      </div>
      <div className='border-t pt-6'>
        <h3 className='text-lg font-medium'>Двухфакторная аутентификация</h3>
        <p className='text-sm text-muted-foreground'>
          Добавьте дополнительный уровень безопасности для вашего аккаунта.
        </p>
        <div className='mt-4 flex items-center space-x-2'>
          <Switch
            id='two-factor'
            checked={twoFactorEnabled}
            onCheckedChange={handleTwoFactorToggle}
          />
          <Label htmlFor='two-factor'>Включить двухфакторную аутентификацию</Label>
        </div>
      </div>
      <div className='border-t pt-6'>
        <h3 className='text-lg font-medium text-destructive'>Опасная зона</h3>
        <p className='text-sm text-muted-foreground'>
          Будьте осторожны с этими действиями, они не могут быть отменены.
        </p>
        <div className='mt-4'>
          <Button variant='destructive'>Удалить аккаунт</Button>
        </div>
      </div>
    </div>
  )
}
