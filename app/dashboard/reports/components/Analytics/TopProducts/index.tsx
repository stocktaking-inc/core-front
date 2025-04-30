'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingDown, TrendingUp } from 'lucide-react'

import { topProducts } from './mock'

export const TopProducts = () => {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Популярные товары</CardTitle>
        <CardDescription>Самые продаваемые товары по выручке</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {topProducts.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-between'
            >
              <div className='space-y-1'>
                <p className='font-medium'>{product.name}</p>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline'>{product.category}</Badge>
                  <span className='text-sm text-muted-foreground'>{product.sku}</span>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center gap-1'>
                  <p className='font-bold'>{product.revenue.toLocaleString()} ₽</p>
                  {product.trend === 'up' ? (
                    <TrendingUp className='h-4 w-4 text-green-500' />
                  ) : (
                    <TrendingDown className='h-4 w-4 text-red-500' />
                  )}
                </div>
                <p className='text-sm text-muted-foreground'>{product.units} шт.</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
