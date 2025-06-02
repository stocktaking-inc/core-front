'use client'

import type React from 'react'
import { useState } from 'react'

import { Edit, Eye, MoreHorizontal, Search, ShoppingCart, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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

import { ISupplier } from '../types'

import { EditDialog, ProductDialog, ViewDetailsDialog } from '../Dialogs'
import { DeleteConfirmDialog } from '@/components/Dialogs/DeleteConfirm'
import { initialSuppliers } from './mock'

const getStatusText = (status: string) => {
  return status === 'active' ? 'Активен' : 'Неактивен'
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
          {getStatusText(status)}
        </Badge>
      )
    case 'inactive':
      return (
        <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>
          {getStatusText(status)}
        </Badge>
      )
    default:
      return <Badge>{status}</Badge>
  }
}

export const SuppliersTable = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suppliers, setSuppliers] = useState<ISupplier[]>(initialSuppliers)
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false)

  const filteredSuppliers = suppliers.filter(
    supplier =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  const confirmDelete = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.filter(s => s.id !== selectedSupplier.id))
      toast.info('Поставщик удален', {
        description: `Поставщик ${selectedSupplier.name} был успешно удален`
      })
      setIsDeleteDialogOpen(false)
    }
  }

  const saveEditedSupplier = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSupplier) {
      const formData = new FormData(e.currentTarget)
      const updatedSupplier = {
        ...selectedSupplier,
        name: formData.get('name') as string,
        contactPerson: formData.get('contactPerson') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        category: formData.get('category') as string,
        status: formData.get('status') as 'active' | 'inactive'
      }

      setSuppliers(suppliers.map(s => (s.id === selectedSupplier.id ? updatedSupplier : s)))
      toast.info('Поставщик обновлен', {
        description: `Информация о поставщике ${updatedSupplier.name} была успешно обновлена`
      })
      setIsEditDialogOpen(false)
    }
  }

  return (
    <>
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
                <TableHead>Категория</TableHead>
                <TableHead>Товары</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className='h-24 text-center'
                  >
                    Результаты не найдены.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map(supplier => (
                  <TableRow key={supplier.id}>
                    <TableCell className='font-medium'>{supplier.name}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>{supplier.productsCount}</TableCell>
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
      </div>

      {/* Диалог просмотра деталей поставщика */}
      <ViewDetailsDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedSupplier={selectedSupplier}
        statusText={getStatusText(selectedSupplier?.status || '')}
        onClick={() => setIsViewDialogOpen(false)}
      />

      {/* Диалог редактирования поставщика */}
      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={saveEditedSupplier}
        selectedSupplier={selectedSupplier}
        onClick={() => setIsEditDialogOpen(false)}
      />

      {/* Диалог просмотра товаров поставщика */}
      <ProductDialog
        open={isProductsDialogOpen}
        onOpenChange={setIsProductsDialogOpen}
        selectedSupplier={selectedSupplier}
        onClick={() => setIsProductsDialogOpen(false)}
      />

      {/* Диалог подтверждения удаления */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClick={confirmDelete}
        onClick1={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    </>
  )
}
