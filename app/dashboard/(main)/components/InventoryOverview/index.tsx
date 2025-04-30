'use client'

import { AlertTriangle, Package, ShoppingCart, TrendingDown, TrendingUp, Truck } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export const InventoryOverview = () => {
  return (
    <Card className='col-span-full lg:col-span-2'>
      <CardHeader>
        <CardTitle>Обзор инвентаря</CardTitle>
        <CardDescription>Сводка текущего состояния вашего инвентаря</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
          <Card>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                <Package className='h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2 sm:mb-0' />
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Всего товаров</p>
                  <div className='flex items-center'>
                    <h3 className='text-xl sm:text-2xl font-bold'>1 248</h3>
                    <span className='ml-2 flex items-center text-xs text-green-500'>
                      <TrendingUp className='mr-1 h-3 w-3' />
                      5.2%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                <ShoppingCart className='h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2 sm:mb-0' />
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Ожидающие заказы</p>
                  <div className='flex items-center'>
                    <h3 className='text-xl sm:text-2xl font-bold'>24</h3>
                    <span className='ml-2 flex items-center text-xs text-amber-500'>
                      <TrendingUp className='mr-1 h-3 w-3' />
                      3.8%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                <Truck className='h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2 sm:mb-0' />
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Входящие поставки</p>
                  <div className='flex items-center'>
                    <h3 className='text-xl sm:text-2xl font-bold'>12</h3>
                    <span className='ml-2 flex items-center text-xs text-green-500'>
                      <TrendingUp className='mr-1 h-3 w-3' />
                      8.1%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
                <AlertTriangle className='h-8 w-8 sm:h-10 sm:w-10 text-destructive mb-2 sm:mb-0' />
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Предупреждения</p>
                  <div className='flex items-center'>
                    <h3 className='text-xl sm:text-2xl font-bold'>8</h3>
                    <span className='ml-2 flex items-center text-xs text-red-500'>
                      <TrendingDown className='mr-1 h-3 w-3' />
                      2.5%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base'>Уровень запасов по категориям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  { name: 'Электроника', value: 75 },
                  { name: 'Аксессуары', value: 45 },
                  { name: 'Офисные принадлежности', value: 60 },
                  { name: 'Компьютерная периферия', value: 52 },
                  { name: 'Хранение данных', value: 15 }
                ].map(category => (
                  <div
                    key={category.name}
                    className='space-y-2'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>{category.name}</span>
                      <span className='text-sm text-muted-foreground'>{category.value}%</span>
                    </div>
                    <Progress
                      value={category.value}
                      className='h-2'
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-base'>Оборачиваемость запасов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  { name: 'Электроника', value: 8.2, trend: 'up' },
                  { name: 'Аксессуары', value: 6.5, trend: 'up' },
                  { name: 'Офисные принадлежности', value: 4.8, trend: 'down' },
                  { name: 'Компьютерная периферия', value: 7.3, trend: 'up' },
                  { name: 'Хранение данных', value: 3.2, trend: 'down' }
                ].map(category => (
                  <div
                    key={category.name}
                    className='flex items-center justify-between border-b pb-2 last:border-0'
                  >
                    <span className='font-medium'>{category.name}</span>
                    <div className='flex items-center gap-1'>
                      <span>{category.value}x</span>
                      {category.trend === 'up' ? (
                        <TrendingUp className='h-4 w-4 text-green-500' />
                      ) : (
                        <TrendingDown className='h-4 w-4 text-red-500' />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
