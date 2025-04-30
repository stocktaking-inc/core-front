import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { CustomersTable } from './components/CustomerTable'
import { AddCustomerDialog } from './components/AddCustomerDialog'

export default function CustomersPage() {
  return (
    <DashboardPageWrapper
      heading='Клиенты'
      text='Управление аккаунтами клиентов.'
      action={<AddCustomerDialog />}
    >
      <CustomersTable />
    </DashboardPageWrapper>
  )
}
