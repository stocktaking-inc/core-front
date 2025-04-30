import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { GridLayout } from '../components/GridLayout'

import { InventoryOverview, RecentActivity } from './components'

export default function DashboardPage() {
  return (
    <DashboardPageWrapper
      heading='Панель управления'
      text='Обзор вашей системы управления инвентаризацией.'
    >
      <GridLayout>
        <InventoryOverview />
        <div className='col-span-full md:col-span-1'>
          <RecentActivity />
        </div>
      </GridLayout>
    </DashboardPageWrapper>
  )
}
