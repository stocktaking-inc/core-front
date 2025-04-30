'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { NotificationSettings, SecuritySettings, UserProfile } from './components'

import { DashboardPageWrapper } from '../components/DashboardPageWrapper'

const ProfilePage = () => {
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(false)
  const [plan, setPlan] = useState('')

  useEffect(() => {
    const showModalParam = searchParams.get('showModal')
    const planParam = searchParams.get('plan')

    if (showModalParam === 'true') {
      setShowModal(true)
    }

    if (planParam) {
      setPlan(planParam)
    }
  }, [searchParams])

  return (
    <DashboardPageWrapper
      heading='Профиль'
      text='Управление вашим профилем и настройками аккаунта.'
    >
      <Tabs
        defaultValue='profile'
        className='space-y-4'
      >
        <TabsList>
          <TabsTrigger value='profile'>Личные данные</TabsTrigger>
          <TabsTrigger value='security'>Безопасность</TabsTrigger>
          <TabsTrigger value='notifications'>Уведомления</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
              <CardDescription>Обновите ваши личные данные и информацию о профиле.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='security'>
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Управление паролем и настройками безопасности.</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='notifications'>
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройте, какие уведомления вы хотите получать.</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog
        open={showModal}
        onOpenChange={setShowModal}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Поздравляем с подключением тарифа {plan}!</DialogTitle>
            <DialogDescription>
              Пожалуйста, заполните дополнительные данные профиля, чтобы мы могли настроить систему
              под ваши потребности.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <p>Рекомендуем заполнить следующие данные:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Информация о компании</li>
              <li>Контактные данные</li>
              <li>Настройки уведомлений</li>
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)}>Понятно</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageWrapper>
  )
}

export default function ProfilePageWrapper() {
  return (
    <Suspense fallback={<div className='w-full text-center py-10'>Загрузка...</div>}>
      <ProfilePage />
    </Suspense>
  )
}
