'use client'

import type React from 'react'
import { useState } from 'react'
import { Edit, Eye, MoreHorizontal, Search, ShoppingCart, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { toast } from 'sonner'

import { ISupplier } from '../../types'
import { suppliersApi } from '../../api'

import { EditSupplierDialog, ProductDialog, ViewDetailsDialog } from '../Dialogs'
import { DeleteConfirmDialog } from '@/components/Dialogs/DeleteConfirm'

import { ISuppliersTable } from './types'

import { getStatusBadge, getStatusText } from '@/utils/Badges'

export const SuppliersTable = ({ suppliers, setSuppliersAction, isLoading }: ISuppliersTable) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false)

  const filteredSuppliers = suppliers.filter(
    supplier =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleViewDetails = (supplier: ISupplier) => {
    setSelectedSupplier(supplier)
    setIsViewDialogOpen(true)
  }

  const handleEditSupplier = (supplier: ISupplier) => {
    setSelectedSupplier(supplier)
    setIsEditDialogOpen(true)
  }

  const handleDeleteSupplier = (supplier: ISupplier) => {
    setSelectedSupplier(supplier)
    setIsDeleteDialogOpen(true)
  }

  const handleViewProducts = (supplier: ISupplier) => {
    setSelectedSupplier(supplier)
    setIsProductsDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedSupplier) return
    try {
      await suppliersApi.deleteSupplier(selectedSupplier.supplierId)
      setSuppliersAction(suppliers.filter(s => s.supplierId !== selectedSupplier.supplierId))
      toast.success('Поставщик удален', {
        description: `Поставщик ${selectedSupplier.name} был успешно удален`
      })
      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      toast.error('Ошибка', {
        description: error.message
      })
    }
  }

  const saveEditedSupplier = async (updatedSupplier: ISupplier) => {
    if (!selectedSupplier) return

    try {
      await suppliersApi.updateSupplier(selectedSupplier.supplierId, updatedSupplier)
      setSuppliersAction(
        suppliers.map(s => (s.supplierId === selectedSupplier.supplierId ? updatedSupplier : s))
      )
      toast.success('Поставщик обновлен', {
        description: `Информация о поставщике ${updatedSupplier.name} была успешно обновлена`
      })
      setIsEditDialogOpen(false)
    } catch (error: any) {
      toast.error('Ошибка', {
        description: error.message
      })
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Поиск поставщиков...'
            className='w-full pl-8'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Поставщик</TableHead>
              <TableHead>Контактное лицо</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Товары</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='h-24 text-center'
                >
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='h-24 text-center'
                >
                  Результаты не найдены.
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map(supplier => (
                <TableRow key={supplier.supplierId}>
                  <TableCell className='font-medium'>{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.goods.length}</TableCell>
                  <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0'
                        >
                          <span className='sr-only'>Открыть меню</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(supplier)}>
                          <Eye className='mr-2 h-4 w-4' /> Просмотр деталей
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSupplier(supplier)}>
                          <Edit className='mr-2 h-4 w-4' /> Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewProducts(supplier)}>
                          <ShoppingCart className='mr-2 h-4 w-4' /> Просмотр товаров
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className='text-destructive'
                          onClick={() => handleDeleteSupplier(supplier)}
                        >
                          <Trash2 className='mr-2 h-4 w-4' /> Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ViewDetailsDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedSupplier={selectedSupplier}
        statusText={getStatusText(selectedSupplier?.status || '')}
        onClick={() => setIsViewDialogOpen(false)}
      />

      <EditSupplierDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={saveEditedSupplier}
        selectedSupplier={selectedSupplier}
        onClick={() => setIsEditDialogOpen(false)}
      />

      <ProductDialog
        open={isProductsDialogOpen}
        onOpenChange={setIsProductsDialogOpen}
        selectedSupplier={selectedSupplier}
        onClick={() => setIsProductsDialogOpen(false)}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClick={confirmDelete}
        onClick1={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  )
}
