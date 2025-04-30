import { ArrowDownToLine, Package, ShoppingCart, Truck } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { recentActivities } from './mock'

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Недавняя активность</CardTitle>
        <CardDescription>Последние операции с инвентарем</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className='flex items-start gap-4'
            >
              <div className='rounded-full p-2 bg-muted'>
                {activity.type === 'order' && <ShoppingCart className='h-4 w-4' />}
                {activity.type === 'shipment' && <Truck className='h-4 w-4' />}
                {activity.type === 'stock' && <Package className='h-4 w-4' />}
                {activity.type === 'restock' && <ArrowDownToLine className='h-4 w-4' />}
              </div>
              <div className='grid gap-1'>
                <p className='font-medium'>{activity.title}</p>
                <p className='text-sm text-muted-foreground'>{activity.description}</p>
                <p className='text-xs text-muted-foreground'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
