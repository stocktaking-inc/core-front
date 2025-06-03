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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { toast } from 'sonner'

import { suppliersApi } from '../../../api'

import {IGood} from "../../../types";
import {IAddGoodDialog} from './types'

export const AddGoodDialog = ({ supplierId, onAddGood }: IAddGoodDialog) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const newGood: Partial<IGood> = {
      name: formData.get('name') as string,
      article: formData.get('article') as string,
      purchasePrice: parseFloat(formData.get('purchasePrice') as string),
      category: formData.get('category') as string,
      supplierId,
    }

    try {
      const addedGood = await suppliersApi.addGood(supplierId, newGood)
      onAddGood(addedGood)
      toast.success('Товар добавлен', {
        description: `Товар ${addedGood.name} успешно добавлен.`,
      })
      setOpen(false)
    } catch (error: any) {
      toast.error('Ошибка', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Добавить товар</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Добавить товар</DialogTitle>
            <DialogDescription>Добавьте новый товар для поставщика.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input id="name" name="name" placeholder="Товар" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article">Артикул</Label>
              <Input id="article" name="article" placeholder="ART123" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Цена закупки</Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                step="0.01"
                placeholder="100.50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input id="category" name="category" placeholder="Электроника" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Добавление...' : 'Добавить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
