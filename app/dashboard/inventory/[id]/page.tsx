import Link from 'next/link'

import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { DashboardHeader } from '../../components/DashboardHeader'
import { DashboardShell } from '../../components/Shell'
import { ProductAnalytics } from '../components/ProductAnalytics'

import { item } from './mock'

export default function InventoryDetailPage() {
  return (
    <DashboardShell>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          asChild
        >
          <Link href='/dashboard/inventory'>
            <ArrowLeft className='h-4 w-4' />
            <span className='sr-only'>Back to inventory</span>
          </Link>
        </Button>
        <DashboardHeader
          heading={item.name}
          text={`SKU: ${item.article}`}
        >
          <div className='flex gap-2'>
            <Button variant='outline'>
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button variant='destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </DashboardHeader>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
              <CardDescription>Detailed information about this inventory item</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>SKU</p>
                  <p>{item.article}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Category</p>
                  <p>{item.category}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Quantity</p>
                  <p>{item.quantity}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Location</p>
                  <p>{item.locationId}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Status</p>
                  <Badge
                    variant={
                      item.status === 'In Stock'
                        ? 'default'
                        : item.status === 'Low Stock'
                          ? 'outline'
                          : 'destructive'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>Supplier</p>
                  <p>{item.supplier.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Movement History</CardTitle>
              <CardDescription>Recent inventory movements for this item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {item.movementHistory.map((movement, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between border-b pb-2 last:border-0 last:pb-0'
                  >
                    <div>
                      <p className='font-medium'>{movement.date}</p>
                      <p className='text-sm text-muted-foreground'>{movement.type}</p>
                    </div>
                    <div className='text-right'>
                      <p
                        className={`font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {movement.quantity > 0 ? '+' : ''}
                        {movement.quantity}
                      </p>
                      <p className='text-sm text-muted-foreground'>Balance: {movement.balance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <ProductAnalytics
          productId={item.id}
          productName={item.name}
          currentStock={item.quantity}
          medianDemand={item.medianDemand}
          daysUntilDepletion={item.daysUntilDepletion}
          usageLevel={item.usageLevel}
        />
      </div>
    </DashboardShell>
  )
}
