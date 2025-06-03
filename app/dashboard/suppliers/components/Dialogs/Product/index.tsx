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

import { AddGoodDialog } from '../AddGood'
import { IGood, IProductDialog } from '../../../types'

export const ProductDialog = (props: IProductDialog) => {
  const handleAddGood = (good: IGood) => {
    if (props.selectedSupplier) {
      props.selectedSupplier.goods.push(good)
    }
  }

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
          <div className='flex justify-end mb-4'>
            <AddGoodDialog
              supplierId={props.selectedSupplier?.supplierId || 0}
              onAddGoodAction={handleAddGood}
            />
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Артикул</TableHead>
                  <TableHead className='text-right'>Цена закупки</TableHead>
                  <TableHead>Категория</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.selectedSupplier?.goods.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className='h-24 text-center'
                    >
                      Нет товаров
                    </TableCell>
                  </TableRow>
                ) : (
                  props.selectedSupplier?.goods.map(good => (
                    <TableRow key={good.id}>
                      <TableCell>{good.name}</TableCell>
                      <TableCell>{good.article}</TableCell>
                      <TableCell className='text-right'>{good.purchasePrice.toFixed(2)}</TableCell>
                      <TableCell>{good.category}</TableCell>
                    </TableRow>
                  ))
                )}
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
