import React from 'react'

import { Badge } from '@/components/ui/badge'

export const getItemStatus = (quantity: number): string => {
  if (quantity === 0) return 'Out of Stock'
  if (quantity < 100) return 'Low Stock'
  return 'In Stock'
}

export const getStatusText = (quantity: number) => {
  const status = getItemStatus(quantity)
  switch (status) {
    case 'In Stock':
      return 'В наличии'
    case 'Low Stock':
      return 'Мало на складе'
    case 'Out of Stock':
      return 'Нет в наличии'
    default:
      return status
  }
}

export const getStatusBadge = (quantity: number) => {
  const status = getItemStatus(quantity)
  switch (status) {
    case 'In Stock':
      return (
        <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
          {getStatusText(quantity)}
        </Badge>
      )
    case 'Low Stock':
      return (
        <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>
          {getStatusText(quantity)}
        </Badge>
      )
    case 'Out of Stock':
      return <Badge variant='destructive'>{getStatusText(quantity)}</Badge>
    default:
      return <Badge>{getStatusText(quantity)}</Badge>
  }
}
