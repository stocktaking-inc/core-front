'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EditInventoryDialogProps {
  item: InventoryItem | null
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSaveAction: (item: InventoryItem) => void
}

export function getItemStatus(quantity: number): string {
  if (quantity === 0) return 'Out of Stock'
  if (quantity < 100) return 'Low Stock'
  return 'In Stock'
}

export const EditInventoryDialog = ({
  item,
  open,
  onOpenChangeAction,
  onSaveAction
}: EditInventoryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const quantity = Number(formData.get('quantity'))
    const updatedItem: InventoryItem = {
      id: item?.id || '',
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      quantity,
      location: formData.get('location') as string,
      status: getItemStatus(quantity) // Вычисляем статус
    }

    setTimeout(() => {
      onSaveAction(updatedItem)
      setIsLoading(false)
      onOpenChangeAction(false)
    }, 1000)
  }

  if (!item) return null

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChangeAction}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogDescription>Обновите данные элемента инвентаря.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Название</Label>
              <Input
                id='name'
                name='name'
                defaultValue={item.name}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='sku'>Артикул</Label>
              <Input
                id='sku'
                name='sku'
                defaultValue={item.sku}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Категория</Label>
              <Input
                id='category'
                name='category'
                defaultValue={item.category}
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
                defaultValue={item.quantity}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='location'>Местоположение</Label>
              <Input
                id='location'
                name='location'
                defaultValue={item.location}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChangeAction(false)}
            >
              Отмена
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
