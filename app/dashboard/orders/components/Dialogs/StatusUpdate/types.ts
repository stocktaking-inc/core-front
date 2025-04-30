import type React from 'react'

import { OrderType } from '../../types'

export interface IStatusUpdate {
  open: boolean
  onOpenChange: (value: boolean | ((prevState: boolean) => boolean)) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  selectedOrder: OrderType | null
  statusColor: string
  statusText: string
  onClick: () => void
}
