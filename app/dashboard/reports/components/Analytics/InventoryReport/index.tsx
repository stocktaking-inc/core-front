'use client'

import { AlertTriangle, Package } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import { inventoryCategories } from './mock'

export const InventoryReport = () => {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Состояние инвентаря</CardTitle>
        <CardDescription>Текущие уровни запасов по категориям</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full bg-primary/10 p-2'>
            <Package className='h-5 w-5 text-primary' />
          </div>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>Всего товаров на складе</p>
            <p className='text-2xl font-bold'>1 248</p>
          </div>
        </div>

        <div className='space-y-4'>
          {inventoryCategories.map(category => (
            <div
              key={category.name}
              className='space-y-2'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{category.name}</span>
                  {category.percentage < 20 && (
                    <AlertTriangle className='h-4 w-4 text-destructive' />
                  )}
                </div>
                <span className='text-sm text-muted-foreground'>{category.count} товаров</span>
              </div>
              <div className='flex items-center gap-2'>
                <Progress
                  value={category.percentage}
                  className='h-2'
                />
                <span className='text-sm font-medium'>{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className='rounded-md bg-muted p-3'>
          <div className='flex items-start gap-2'>
            <AlertTriangle className='h-5 w-5 text-amber-500' />
            <div>
              <p className='font-medium'>Предупреждение о низком запасе</p>
              <p className='text-sm text-muted-foreground'>
                8 товаров имеют низкий уровень запасов и требуют пополнения в ближайшее время.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
