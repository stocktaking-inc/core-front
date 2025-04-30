'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Package2 } from 'lucide-react'
import Link from 'next/link'

function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState<string>('')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam) {
      setPlan(planParam)
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [searchParams, router])

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <header className='bg-white border-b'>
        <div className='container mx-auto px-4 py-4 flex items-center'>
          <Link
            href='/'
            className='flex items-center gap-2'
          >
            <Package2 className='h-6 w-6' />
            <span className='font-bold'>Система инвентаризации</span>
          </Link>
        </div>
      </header>
      <main className='flex-1 container mx-auto px-4 py-8 flex items-center justify-center'>
        <Card className='max-w-md w-full'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
              <CheckCircle2 className='h-10 w-10 text-green-600' />
            </div>
            <CardTitle className='text-2xl'>Оплата успешно выполнена!</CardTitle>
            <CardDescription>Ваш тариф "{plan}" успешно активирован</CardDescription>
          </CardHeader>
          <CardContent className='text-center space-y-4'>
            <p>
              Спасибо за выбор нашей системы инвентаризации. Вы можете начать пользоваться всеми
              возможностями тарифа прямо сейчас.
            </p>
            <p className='text-sm text-muted-foreground'>
              Вы будете автоматически перенаправлены на панель управления через {countdown} сек.
            </p>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button asChild>
              <Link href='/dashboard'>Перейти в панель управления</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default function PaymentSuccessPageWrapper() {
  return (
    <Suspense fallback={<div className='w-full text-center py-10'>Загрузка...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  )
}
