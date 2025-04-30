import { OrderType } from '../../types'

export interface IInvoiceGeneration {
  open: boolean
  onOpenChange: (value: boolean | ((prevState: boolean) => boolean)) => void
  selectedOrder: OrderType | null
  onClick: () => void
  onClick1: () => void
}
