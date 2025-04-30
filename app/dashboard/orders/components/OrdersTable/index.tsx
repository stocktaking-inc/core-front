'use client'

import type React from 'react'
import { useState } from 'react'

import { Ban, Eye, FileText, MoreHorizontal, Search, Truck } from 'lucide-react'

import { InvoiceGenerationDialog, StatusUpdateDialog, ViewOrderDialog } from '../Dialogs/'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

import { toast } from '@/hooks/use-toast'

import { OrderType } from '../types'

import { initialOrders } from './mock'

export const OrdersTable = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState<OrderType[]>(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)

  const filteredOrders = orders.filter(
    order =>
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
      case 'Processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      case 'Delivered':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100'
      default:
        return ''
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'Ожидает'
      case 'Processing':
        return 'Обрабатывается'
      case 'Shipped':
        return 'Отправлен'
      case 'Delivered':
        return 'Доставлен'
      case 'Cancelled':
        return 'Отменен'
      default:
        return status
    }
  }

  const handleViewDetails = (order: OrderType) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleGenerateInvoice = (order: OrderType) => {
    setSelectedOrder(order)
    setIsInvoiceDialogOpen(true)
  }

  const handleUpdateStatus = (order: OrderType) => {
    setSelectedOrder(order)
    setIsStatusDialogOpen(true)
  }

  const updateOrderStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedOrder) {
      const formData = new FormData(e.currentTarget)
      const newStatus = formData.get('status') as string

      setOrders(
        orders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        )
      )

      toast({
        title: 'Статус обновлен',
        description: `Статус заказа ${selectedOrder.orderNumber} изменен на ${getStatusText(newStatus)}`
      })

      setIsStatusDialogOpen(false)
    }
  }

  const downloadInvoice = () => {
    if (selectedOrder) {
      toast({
        title: 'Счет сгенерирован',
        description: `Счет для заказа ${selectedOrder.orderNumber} успешно сгенерирован`
      })
      setIsInvoiceDialogOpen(false)
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
              placeholder='Поиск заказов...'
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
                <TableHead>Заказ №</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Товары</TableHead>
                <TableHead className='text-right'>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='h-24 text-center'
                  >
                    Результаты не найдены.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className='font-medium'>{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className='text-right'>
                      ${order.total?.toFixed(2) ?? '0.00'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status ?? '')}>
                        {getStatusText(order.status ?? '')}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                            <Eye className='mr-2 h-4 w-4' /> Просмотр деталей
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleGenerateInvoice(order)}>
                            <FileText className='mr-2 h-4 w-4' /> Сгенерировать счет
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order)}>
                            <Truck className='mr-2 h-4 w-4' /> Обновить статус
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className='text-destructive'
                            onClick={() => {
                              setOrders(
                                orders.map(o =>
                                  o.id === order.id ? { ...o, status: 'Cancelled' } : o
                                )
                              )
                              toast({
                                title: 'Заказ отменен',
                                description: `Заказ ${order.orderNumber} был отменен`
                              })
                            }}
                          >
                            <Ban className='mr-2 h-4 w-4' /> Отменить заказ
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

      {/* Диалог просмотра деталей заказа */}
      <ViewOrderDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedOrder={selectedOrder}
        statusColor={getStatusColor(selectedOrder?.status ?? '')}
        statusText={getStatusText(selectedOrder?.status ?? '')}
        onClick={() => setIsViewDialogOpen(false)}
      />

      {/* Диалог генерации счета */}
      <InvoiceGenerationDialog
        open={isInvoiceDialogOpen}
        onOpenChange={setIsInvoiceDialogOpen}
        selectedOrder={selectedOrder}
        onClick={() => setIsInvoiceDialogOpen(false)}
        onClick1={downloadInvoice}
      />

      {/* Диалог обновления статуса */}
      <StatusUpdateDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        onSubmit={updateOrderStatus}
        selectedOrder={selectedOrder}
        statusColor={getStatusColor(selectedOrder?.status ?? '')}
        statusText={getStatusText(selectedOrder?.status ?? '')}
        onClick={() => setIsStatusDialogOpen(false)}
      />
    </>
  )
}
