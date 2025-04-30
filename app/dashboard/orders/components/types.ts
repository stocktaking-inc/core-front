export type OrderType = {
  id: string
  orderNumber: string
  customer: string
  date: string
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | string | undefined
  items: number
}
