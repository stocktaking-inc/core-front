'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getInitials } from '@/utils/shared'

import { topCustomers } from './mock'

export function TopCustomers() {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Лучшие клиенты</CardTitle>
        <CardDescription>Клиенты с наибольшей суммой покупок</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {topCustomers.map((customer, index) => (
            <div
              key={index}
              className='flex items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?height=32&width=32`}
                    alt={customer.name}
                  />
                  <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <p className='font-medium'>{customer.name}</p>
                  <p className='text-sm text-muted-foreground'>{customer.email}</p>
                </div>
              </div>
              <div className='text-right'>
                <p className='font-bold'>{customer.spent.toLocaleString()} ₽</p>
                <p className='text-sm text-muted-foreground'>{customer.orders} заказов</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
