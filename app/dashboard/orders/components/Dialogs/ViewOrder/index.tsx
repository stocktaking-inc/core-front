import type React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { IViewOrder } from './types'

export const ViewOrderDialog = (props: IViewOrder) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Детали заказа</DialogTitle>
          <DialogDescription>
            Информация о заказе {props.selectedOrder?.orderNumber}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='text-sm text-muted-foreground'>Номер заказа</Label>
              <p className='font-medium'>{props.selectedOrder?.orderNumber}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Дата</Label>
              <p className='font-medium'>{props.selectedOrder?.date}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Клиент</Label>
              <p className='font-medium'>{props.selectedOrder?.customer}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Статус</Label>
              <Badge className={props.statusColor}>{props.statusText}</Badge>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Количество товаров</Label>
              <p className='font-medium'>{props.selectedOrder?.items}</p>
            </div>
            <div>
              <Label className='text-sm text-muted-foreground'>Сумма</Label>
              <p className='font-medium'>${props.selectedOrder?.total?.toFixed(2) ?? '0.00'}</p>
            </div>
          </div>
          <div className='mt-4'>
            <Label className='text-sm text-muted-foreground'>Товары в заказе</Label>
            <div className='mt-2 rounded-md border p-4'>
              <p className='text-center text-muted-foreground'>
                Список товаров будет отображаться здесь
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={props.onClick}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
