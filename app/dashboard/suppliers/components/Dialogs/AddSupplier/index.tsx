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

import { toast } from 'sonner'

import { AddButton } from '../../../../components/AddButton'

import { ISupplier } from '../../types'
import { IAddSupplierDialog } from './types'

export const AddSupplierDialog = ({ onAddSupplier }: IAddSupplierDialog) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const newSupplier: ISupplier = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.get('name') as string,
      contactPerson: formData.get('contact') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as 'active' | 'inactive',
      productsCount: formData.get('productsCount') as unknown as number
    }

    setTimeout(() => {
      if (onAddSupplier) {
        onAddSupplier(newSupplier)
      }
      toast.success('Поставщик добавлен', {
        description: `Поставщик ${newSupplier.name} успешно добавлен.`
      })
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
        <AddButton label='Добавить поставщика' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить поставщика</DialogTitle>
            <DialogDescription>Добавьте нового поставщика в систему.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Название</Label>
              <Input
                id='name'
                name='name'
                placeholder='ООО Поставщик'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='contact'>Контактное лицо</Label>
              <Input
                id='contact'
                name='contact'
                placeholder='Анна Петрова'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='supplier@example.com'
                required
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
