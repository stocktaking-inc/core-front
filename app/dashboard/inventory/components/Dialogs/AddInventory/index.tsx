'use client'

import React, { useState } from 'react'
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
import { AddButton } from '@/app/dashboard/components/AddButton'
import { toast } from '@/hooks/use-toast'

interface AddInventoryDialogProps {
  onAddItemAction: (item: InventoryItem) => void
}

export const getItemStatus = (quantity: number): string => {
  if (quantity === 0) return 'Out of Stock'
  if (quantity < 100) return 'Low Stock'
  return 'In Stock'
}

export const AddInventoryDialog = ({ onAddItemAction }: AddInventoryDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const quantity = Number(formData.get('quantity'))
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      quantity,
      location: formData.get('location') as string,
      status: getItemStatus(quantity) // Вычисляем статус
    }

    setTimeout(() => {
      onAddItemAction(newItem)
      toast({
        title: 'Элемент добавлен',
        description: `Элемент ${newItem.name} успешно добавлен.`
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
        <AddButton label='Добавить товар' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить товар</DialogTitle>
            <DialogDescription>Добавьте новый элемент в инвентарь.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Название</Label>
              <Input
                id='name'
                name='name'
                placeholder='Беспроводные наушники'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='sku'>Артикул</Label>
              <Input
                id='sku'
                name='sku'
                placeholder='WH-1001'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Категория</Label>
              <Input
                id='category'
                name='category'
                placeholder='Электроника'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='quantity'>Количество</Label>
              <Input
                id='quantity'
                name='quantity'
                type='number'
                min='0'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='location'>Местоположение</Label>
              <Input
                id='location'
                name='location'
                placeholder='Склад A'
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
