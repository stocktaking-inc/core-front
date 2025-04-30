'use client'

import { BarChart3, Package } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const ProductAnalytics = (props: IProductAnalytics) => {
  const getUsageLevelBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>Высокий</Badge>
      case 'medium':
        return <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>Средний</Badge>
      case 'low':
        return <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>Низкий</Badge>
      default:
        return <Badge>{level}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Аналитика продукта</CardTitle>
        <CardDescription>Анализ производительности продукта</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <BarChart3 className='h-4 w-4 text-muted-foreground' />
          <p className='text-sm font-medium text-muted-foreground'>
            Название продукта: {props.productName}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Package className='h-4 w-4 text-muted-foreground' />
          <p className='text-sm font-medium text-muted-foreground'>
            Текущий запас: {props.currentStock}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Package className='h-4 w-4 text-muted-foreground' />
          <p className='text-sm font-medium text-muted-foreground'>
            Средний спрос: {props.medianDemand}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Package className='h-4 w-4 text-muted-foreground' />
          <p className='text-sm font-medium text-muted-foreground'>
            Дней до истощения: {props.daysUntilDepletion}
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Package className='h-4 w-4 text-muted-foreground' />
          <p className='text-sm font-medium text-muted-foreground'>
            Уровень использования: {getUsageLevelBadge(props.usageLevel)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
