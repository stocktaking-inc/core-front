'use client'

import React, { useState, useEffect } from 'react'
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

import { ISupplier } from '@/app/dashboard/suppliers/types'
import { BASE_BACKEND_URL } from '@/utils/shared/api/routes'

export const AddInventoryDialog: React.FC<IAddInventoryDialog> = ({ onAddItemAction }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'status'>>({
    name: '',
    article: '',
    category: '',
    quantity: 0,
    locationId: null,
    supplierId: 0
  })

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/warehouses`, {
          headers: { Accept: 'application/json' }
        })
        if (!response.ok) throw new Error('Ошибка загрузки складов')
        const data: Warehouse[] = await response.json()
        setWarehouses(data.filter(w => w.isActive))
      } catch (err) {
        toast.warning('Ошибка', {
          description: 'Не удалось загрузить склады'
        })
      }
    }

    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${BASE_BACKEND_URL}/suppliers`, {
          headers: { Accept: 'application/json' }
        })
        if (!response.ok) throw new Error('Ошибка загрузки поставщиков')
        const data: ISupplier[] = await response.json()
        setSuppliers(data)
      } catch (err) {
        toast.warning('Ошибка', {
          description: 'Не удалось загрузить поставщиков'
        })
      }
    }

    fetchWarehouses()
    fetchSuppliers()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onAddItemAction(formData)
      toast.success('Элемент добавлен', {
        description: `Элемент ${formData.name} успешно добавлен.`
      })
      setFormData({
        name: '',
        article: '',
        category: '',
        quantity: 0,
        locationId: null,
        supplierId: 0
      })
      setOpen(false)
    } catch (err) {
      toast.warning('Ошибка', {
        description: err instanceof Error ? err.message : 'Не удалось добавить элемент'
      })
    } finally {
      setIsLoading(false)
    }
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
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='article'>Артикул</Label>
              <Input
                id='article'
                name='article'
                placeholder='WH-1001'
                value={formData.article}
                onChange={e => setFormData({ ...formData, article: e.target.value })}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Категория</Label>
              <Input
                id='category'
                name='category'
                placeholder='Электроника'
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.quantity}
                onChange={e =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='locationId'>Местоположение</Label>
              <Select
                name='locationId'
                value={formData.locationId?.toString() || ''}
                onValueChange={value =>
                  setFormData({ ...formData, locationId: value ? parseInt(value) : null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Выберите склад' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='null'>Нет склада</SelectItem>
                  {warehouses.map(warehouse => (
                    <SelectItem
                      key={warehouse.id}
                      value={warehouse.id.toString()}
                    >
                      {warehouse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='supplierId'>Поставщик</Label>
              <Select
                name='supplierId'
                value={formData.supplierId.toString()}
                onValueChange={value => setFormData({ ...formData, supplierId: parseInt(value) })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='Выберите поставщика' />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem
                      key={supplier.supplierId}
                      value={supplier.supplierId.toString()}
                    >
                      {supplier.name}
                    </SelectItem>
                  ))}
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
