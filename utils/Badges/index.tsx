import React from 'react'

import { Badge } from '@/components/ui/badge'

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'In Stock':
      return <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>{status}</Badge>
    case 'Low Stock':
      return <Badge className='bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>{status}</Badge>
    case 'Out of Stock':
      return <Badge variant='destructive'>{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}
