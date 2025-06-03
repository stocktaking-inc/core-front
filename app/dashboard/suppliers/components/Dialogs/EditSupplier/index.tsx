'use client'

import type React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ISupplier } from '../../../types'

interface IEditSupplierDialog {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (updatedSupplier: ISupplier) => void
  selectedSupplier: ISupplier | null
  onClick: () => void
}

export const EditSupplierDialog = (props: IEditSupplierDialog) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!props.selectedSupplier) return

    const formData = new FormData(e.currentTarget)
    const updatedSupplier: ISupplier = {
      ...props.selectedSupplier,
      name: formData.get('name') as string,
      contactPerson: formData.get('contactPerson') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as 'Active' | 'Inactive',
    }

    props.onSubmit(updatedSupplier)
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Редактировать поставщика</DialogTitle>
            <DialogDescription>
              Измените информацию о поставщике и нажмите Сохранить
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={props.selectedSupplier?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Контактное лицо</Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  defaultValue={props.selectedSupplier?.contactPerson}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={props.selectedSupplier?.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={props.selectedSupplier?.phone}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <select
                  id="status"
                  name="status"
                  defaultValue={props.selectedSupplier?.status}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Active">Активен</option>
                  <option value="Inactive">Неактивен</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={props.onClick}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
