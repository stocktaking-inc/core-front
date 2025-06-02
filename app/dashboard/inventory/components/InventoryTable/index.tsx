'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, Eye, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { EditInventoryDialog } from '../Dialogs'
import { DeleteConfirmDialog } from '@/components/Dialogs/DeleteConfirm'

import { useMediaQuery } from '@/hooks/use-media-query'
import { getStatusBadge } from '@/utils/Badges'


export const InventoryTable = ({
                                 items,
                                 onDeleteItemAction,
                                 onEditItemAction
                               }: IInventoryTable) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()

  const filteredItems = (items || []).filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedItem) {
      onDeleteItemAction(selectedItem.id)
      toast.info('Элемент удален', {
        description: 'Элемент инвентаря был успешно удален'
      })
      setIsDeleteDialogOpen(false)
      setSelectedItem(null)
    }
  }

  const handleView = (id: number) => {
    router.push(`/dashboard/inventory/${id}`)
  }

  const handleSaveEdit = async (updatedItem: InventoryItem) => {
    const itemWithStatus = { ...updatedItem }
    await onEditItemAction(itemWithStatus)
    setIsEditDialogOpen(false)
    setSelectedItem(null)
  }

  if (isMobile) {
    return (
      <>
        <div className='space-y-4'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Поиск в инвентаре...'
              className='w-full pl-8'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='space-y-4'>
            {filteredItems.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Результаты не найдены.</div>
            ) : (
              filteredItems.map(item => (
                <Card key={item.id} className='overflow-hidden'>
                  <CardContent className='p-0'>
                    <div className='p-4 border-b bg-muted/30'>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Открыть меню</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(item.id)}>
                              <Eye className='mr-2 h-4 w-4' /> Просмотр деталей
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Edit className='mr-2 h-4 w-4' /> Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className='text-destructive'
                              onClick={() => handleDelete(item)}
                            >
                              <Trash2 className='mr-2 h-4 w-4' /> Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className='p-4 space-y-2'>
                      <div className='grid grid-cols-2 gap-2'>
                        <div>
                          <p className='text-sm text-muted-foreground'>Артикул</p>
                          <p>{item.article}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Категория</p>
                          <p>{item.category}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Количество</p>
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-2'>
                        <div>
                          <p className='text-sm text-muted-foreground'>Местоположение</p>
                          <p>{item.locationId}</p>
                        </div>
                        <div>
                          <p className='text-sm text-muted-foreground'>Статус</p>
                          <div>item.quantity</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onClick={() => setSelectedItem(null)}
          onClick1={confirmDelete}
        />

        <EditInventoryDialog
          item={selectedItem}
          open={isEditDialogOpen}
          onOpenChangeAction={setIsEditDialogOpen}
          onSaveAction={handleSaveEdit}
        />
      </>
    )
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Поиск в инвентаре...'
              className='w-full pl-8'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='rounded-md border overflow-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Артикул</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className='text-right'>Количество</TableHead>
                <TableHead>Местоположение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='h-24 text-center'
                  >
                    Результаты не найдены.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell>{item.article}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className='text-right'>{item.quantity}</TableCell>
                    <TableCell>{item.locationId}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleView(item.id)}>
                            <Eye className='mr-2 h-4 w-4' /> Просмотр деталей
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className='mr-2 h-4 w-4' /> Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className='text-destructive'
                            onClick={() => handleDelete(item)}
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

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onClick={confirmDelete}
        onClick1={() => {}}
      />

      <EditInventoryDialog
        item={selectedItem}
        open={isEditDialogOpen}
        onOpenChangeAction={setIsEditDialogOpen}
        onSaveAction={handleSaveEdit}
      />
    </>
  )
}
