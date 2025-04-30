interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  status: 'Active' | 'Inactive'
  lastOrder: string
}
