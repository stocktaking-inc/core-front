import type React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { IViewDetailsDialog } from './types'

export const ViewDetailsDialog = (props: IViewDetailsDialog) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Детали поставщика</DialogTitle>
          <DialogDescription>
            Информация о поставщике {props.selectedSupplier?.name}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='text-sm text-muted-foreground'>Название</Label>
              <p className='font-medium'>{props.selectedSupplier?.name}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Контактное лицо</Label>
              <p className='font-medium'>{props.selectedSupplier?.contactPerson}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Email</Label>
              <p className='font-medium'>{props.selectedSupplier?.email}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Телефон</Label>
              <p className='font-medium'>{props.selectedSupplier?.phone}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Категория</Label>
              <p className='font-medium'>{props.selectedSupplier?.category}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Статус</Label>
              <Badge
                variant={props.selectedSupplier?.status === 'Active' ? 'default' : 'secondary'}
              >
                {props.statusText}
              </Badge>
            </div>
          </div>
          <div>
            <Label className='text-sm text-muted-foreground'>Количество товаров</Label>
            <p className='font-medium'>{props.selectedSupplier?.productsCount}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={props.onClick}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
