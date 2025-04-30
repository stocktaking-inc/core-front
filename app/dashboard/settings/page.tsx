import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { DashboardPageWrapper } from '../components/DashboardPageWrapper'

import { GeneralSettings } from './components/GeneralSettings'

export default function SettingsPage() {
  return (
    <DashboardPageWrapper
      heading='Настройки'
      text='Управление настройками системы.'
    >
      <Card>
        <CardHeader>
          <CardTitle>Общие настройки</CardTitle>
          <CardDescription>Настройте основные параметры системы.</CardDescription>
        </CardHeader>
        <CardContent>
          <GeneralSettings />
        </CardContent>
      </Card>
    </DashboardPageWrapper>
  )
}
