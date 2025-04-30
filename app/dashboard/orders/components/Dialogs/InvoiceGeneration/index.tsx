import type React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IInvoiceGeneration } from './types'

export const InvoiceGenerationDialog = (props: IInvoiceGeneration) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Сгенерировать счет</DialogTitle>
          <DialogDescription>
            Генерация счета для заказа {props.selectedOrder?.orderNumber}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <div className='rounded-md border p-4'>
            <div className='mb-4 flex justify-between'>
              <div>
                <h3 className='font-bold'>Счет #{props.selectedOrder?.orderNumber}</h3>
                <p className='text-sm text-muted-foreground'>Дата: {props.selectedOrder?.date}</p>
              </div>
              <div className='text-right'>
                <h3 className='font-bold'>Система инвентаризации</h3>
                <p className='text-sm text-muted-foreground'>ИНН: 1234567890</p>
              </div>
            </div>
            <div className='mb-4'>
              <h4 className='font-medium'>Клиент:</h4>
              <p>{props.selectedOrder?.customer}</p>
            </div>
            <div className='mb-4'>
              <h4 className='font-medium'>Товары:</h4>
              <div className='mt-2 rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Товар</TableHead>
                      <TableHead className='text-right'>Кол-во</TableHead>
                      <TableHead className='text-right'>Цена</TableHead>
                      <TableHead className='text-right'>Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className='h-24 text-center'
                      >
                        Данные о товарах будут отображаться здесь
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='text-right'>
                <p className='font-medium'>
                  Итого: ${props.selectedOrder?.total?.toFixed(2) ?? '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={props.onClick}
          >
            Отмена
          </Button>
          <Button onClick={props.onClick1}>Скачать счет</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
