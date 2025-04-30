import { SuppliersTable } from './components/SuppliersTable'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { AddSupplierDialog } from './components/Dialogs'

export default function SuppliersPage() {
  return (
    <DashboardPageWrapper
      heading='Поставщики'
      text='Управление поставщиками продукции.'
      action={<AddSupplierDialog />}
    >
      <SuppliersTable />
    </DashboardPageWrapper>
  )
}
