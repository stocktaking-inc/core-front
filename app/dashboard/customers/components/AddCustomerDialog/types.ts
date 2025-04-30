export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
}

export interface IAddCustomerDialog {
  onAddCustomer?: (customer: Customer) => void
}
