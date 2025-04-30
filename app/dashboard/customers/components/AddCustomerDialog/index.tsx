'use client'

import type React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { AddButton } from '../../../components/AddButton'

import { Customer, IAddCustomerDialog } from './types'

export const AddCustomerDialog = ({ onAddCustomer }: IAddCustomerDialog) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const newCustomer: Customer = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string | undefined
    }

    setTimeout(() => {
      if (onAddCustomer) {
        onAddCustomer(newCustomer)
      }
      setIsLoading(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <AddButton label='Добавить клиента' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить клиента</DialogTitle>
            <DialogDescription>Добавьте нового клиента в систему.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Имя</Label>
              <Input
                id='name'
                name='name'
                placeholder='Иван Иванов'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='ivan@example.com'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Телефон (опционально)</Label>
              <Input
                id='phone'
                name='phone'
                placeholder='+7 (123) 456-78-90'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Добавление...' : 'Добавить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
