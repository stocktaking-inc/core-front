export interface ISupplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  category: string
  status: 'active' | 'inactive'
  productsCount: number
}
