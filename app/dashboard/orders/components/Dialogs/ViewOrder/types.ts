import { OrderType } from '../../types'

export interface IViewOrder {
  open: boolean
  onOpenChange: (value: boolean | ((prevState: boolean) => boolean)) => void
  selectedOrder: OrderType | null
  statusColor: string
  statusText: string
  onClick: () => void
}
