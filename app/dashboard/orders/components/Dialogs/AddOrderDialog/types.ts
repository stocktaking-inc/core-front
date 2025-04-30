interface Order {
  id: string
  orderNumber: string
  customer: string
  date: string
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  items: number
}

interface AddOrderDialogProps {
  onAddOrder?: (order: Order) => void
}
