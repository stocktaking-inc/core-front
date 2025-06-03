'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { EditWarehouseDialog } from '../Dialogs/EditWarehouse'
import { patchWarehouse, deleteWarehouse } from '../../api'

export const WarehousesTable = ({
  items,
  onEditWarehouseAction,
  onDeleteWarehouseAction
}: IWarehousesTable) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await patchWarehouse(id, !isActive)
      const updatedItem = { ...items.find(item => item.id === id)!, isActive: !isActive }
      await onEditWarehouseAction(updatedItem)
      toast.success('Статус склада обновлён')
    } catch (err) {}
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteWarehouse(id)
      await onDeleteWarehouseAction(id)
      toast.success('Склад удалён')
    } catch {
      toast.warning('Нельзя удалить склад, так как он связан с предметами инвентаря')
    }
  }

  return (
    <div className='space-y-4'>
      <Input
        placeholder='Поиск по названию или адресу...'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className='max-w-sm'
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Активен</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className='h-24 text-center'
              >
                Результаты не найдены.
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.address || '-'}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => handleToggleActive(item.id, item.isActive)}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <EditWarehouseDialog
                      item={item}
                      onSaveAction={onEditWarehouseAction}
                    />
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(item.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
