import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { OrdersTable } from './components/OrdersTable'
import { AddOrderDialog } from './components/Dialogs/AddOrderDialog'

export default function OrdersPage() {
  return (
    <DashboardPageWrapper
      heading='Заказы'
      text='Управление заказами клиентов.'
      action={<AddOrderDialog />}
    >
      <OrdersTable />
    </DashboardPageWrapper>
  )
}
