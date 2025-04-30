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

import { IProductDialog } from './types'

export const ProductDialog = (props: IProductDialog) => {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
    >
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Товары поставщика</DialogTitle>
          <DialogDescription>Товары, поставляемые {props.selectedSupplier?.name}</DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className='text-right'>Цена</TableHead>
                  <TableHead>Категория</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 text-center'
                  >
                    Список товаров будет отображаться здесь
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={props.onClick}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
