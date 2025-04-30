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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { IStatusUpdate } from './types'

export const StatusUpdateDialog = (props: IStatusUpdate) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <form onSubmit={props.onSubmit}>
          <DialogHeader>
            <DialogTitle>Обновить статус</DialogTitle>
            <DialogDescription>
              Изменение статуса заказа {props.selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='current-status'>Текущий статус</Label>
              <Badge className={props.statusColor}>{props.statusText}</Badge>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Новый статус</Label>
              <Select
                name='status'
                defaultValue={props.selectedOrder?.status}
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
              onClick={props.onClick}
            >
              Отмена
            </Button>
            <Button type='submit'>Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
