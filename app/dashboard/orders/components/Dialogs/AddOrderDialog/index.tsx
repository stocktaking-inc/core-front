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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { AddButton } from '@/app/dashboard/components/AddButton'
import { toast } from 'sonner'

export const AddOrderDialog = ({ onAddOrder }: AddOrderDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const total = Number.parseFloat(formData.get('total') as string)
    const items = Number.parseInt(formData.get('items') as string)

    if (isNaN(total) || total < 0 || isNaN(items) || items < 0) {
      toast.warning('Ошибка', {
        description: 'Пожалуйста, введите корректные значения для суммы и количества товаров.',
      })
      setIsLoading(false)
      return
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9),
      orderNumber: formData.get('orderNumber') as string,
      customer: formData.get('customer') as string,
      date: new Date().toISOString().split('T')[0], // Сегодняшняя дата
      total,
      status: formData.get('status') as Order['status'],
      items
    }

    setTimeout(() => {
      if (onAddOrder) {
        onAddOrder(newOrder)
      }
      toast.success('Заказ добавлен', {
        description: `Заказ ${newOrder.orderNumber} успешно добавлен.`
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
        <AddButton label='Новый заказ' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить заказ</DialogTitle>
            <DialogDescription>Создайте новый заказ в системе.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='orderNumber'>Номер заказа</Label>
                <Input
                  id='orderNumber'
                  name='orderNumber'
                  placeholder='ORD-001'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='customer'>Клиент</Label>
                <Input
                  id='customer'
                  name='customer'
                  placeholder='Иван Иванов'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='total'>Сумма</Label>
                <Input
                  id='total'
                  name='total'
                  type='number'
                  step='0.01'
                  placeholder='99.99'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='items'>Количество товаров</Label>
                <Input
                  id='items'
                  name='items'
                  type='number'
                  placeholder='10'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Статус</Label>
              <Select
                name='status'
                required
                defaultValue='Pending'
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Выберите статус' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Pending'>Ожидает</SelectItem>
                  <SelectItem value='Processing'>Обрабатывается</SelectItem>
                  <SelectItem value='Shipped'>Отправлен</SelectItem>
                  <SelectItem value='Delivered'>Доставлен</SelectItem>
                  <SelectItem value='Cancelled'>Отменен</SelectItem>
                </SelectContent>
              </Select>
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
