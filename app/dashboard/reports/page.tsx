import { InventoryReport, SalesReport, TopCustomers, TopProducts } from './components/Analytics'

import { DateRangeDialog } from './components/Dialogs/DateRangeDialog'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { GridLayout } from '../components/GridLayout'

export default function ReportsPage() {
  return (
    <DashboardPageWrapper
      heading='Отчеты'
      text='Просмотр и анализ данных вашего бизнеса.'
      action={<DateRangeDialog />}
    >
      <GridLayout className='grid gap-6 md:grid-cols-2'>
        <SalesReport />
        <InventoryReport />
        <TopProducts />
        <TopCustomers />
      </GridLayout>
    </DashboardPageWrapper>
  )
}
