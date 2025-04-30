'use client'

import { ArrowUpRight, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const SalesReport = () => {
  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle>Отчет по продажам</CardTitle>
        <CardDescription>Обзор показателей продаж</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='revenue'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='revenue'>Выручка</TabsTrigger>
            <TabsTrigger value='orders'>Заказы</TabsTrigger>
            <TabsTrigger value='growth'>Рост</TabsTrigger>
          </TabsList>
          <TabsContent
            value='revenue'
            className='space-y-4 pt-4'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-primary/10 p-2'>
                  <DollarSign className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Общая выручка</p>
                  <p className='text-2xl font-bold'>24 780,50 ₽</p>
                </div>
              </div>
              <div className='flex items-center gap-1 text-green-500'>
                <ArrowUpRight className='h-4 w-4' />
                <span className='font-medium'>12.5%</span>
              </div>
            </div>
            <div className='h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center'>
              <p className='text-muted-foreground'>График выручки будет отображаться здесь</p>
            </div>
          </TabsContent>
          <TabsContent
            value='orders'
            className='space-y-4 pt-4'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-primary/10 p-2'>
                  <ShoppingCart className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Всего заказов</p>
                  <p className='text-2xl font-bold'>356</p>
                </div>
              </div>
              <div className='flex items-center gap-1 text-green-500'>
                <ArrowUpRight className='h-4 w-4' />
                <span className='font-medium'>8.2%</span>
              </div>
            </div>
            <div className='h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center'>
              <p className='text-muted-foreground'>График заказов будет отображаться здесь</p>
            </div>
          </TabsContent>
          <TabsContent
            value='growth'
            className='space-y-4 pt-4'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-primary/10 p-2'>
                  <TrendingUp className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Темп роста</p>
                  <p className='text-2xl font-bold'>10.8%</p>
                </div>
              </div>
            </div>
            <div className='h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center'>
              <p className='text-muted-foreground'>График роста будет отображаться здесь</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
