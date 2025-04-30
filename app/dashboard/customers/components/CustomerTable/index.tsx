'use client'

import { useState } from 'react'

import { Edit, Eye, Mail, MoreHorizontal, Search, ShoppingCart, Trash2 } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { customers } from './mock'

export const CustomersTable = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = customers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const getStatusText = (status: string) => {
    return status === 'Active' ? 'Активен' : 'Неактивен'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
            {getStatusText(status)}
          </Badge>
        )
      case 'Inactive':
        return (
          <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>
            {getStatusText(status)}
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Поиск клиентов...'
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
              <TableHead>Клиент</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Заказы</TableHead>
              <TableHead className='text-right'>Сумма покупок</TableHead>
              <TableHead>Последний заказ</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className='h-24 text-center'
                >
                  Результаты не найдены.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={customer.name}
                        />
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <span className='font-medium'>{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell className='text-right'>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
                        <DropdownMenuItem>
                          <Eye className='mr-2 h-4 w-4' /> Просмотр деталей
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className='mr-2 h-4 w-4' /> Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className='mr-2 h-4 w-4' /> Просмотр заказов
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className='mr-2 h-4 w-4' /> Отправить email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive'>
                          <Trash2 className='mr-2 h-4 w-4' /> Удалить клиента
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
  )
}
