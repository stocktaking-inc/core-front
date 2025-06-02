'use client'

import type React from 'react'
import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

import { Calendar, CreditCard, Lock, Package2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { paymentSchema } from '@/lib/validation'
import { formatCardNumber, formatExpiryDate, getPlanPrice } from '@/utils/Payment'

interface FormData {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

const PaymentPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const cardNumberRef = useRef<HTMLInputElement>(null)

  const mutation = useMutation({
    mutationFn: async (data: FormData & { plan: string }) => {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ошибка при обработке платежа')
      }

      return response.json()
    },
    onSuccess: () => {
      setFormData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      })
      router.push(`/dashboard/profile?showModal=true&plan=${encodeURIComponent(plan)}`)
    },
    onError: (error: Error) => {
      setFormError(error.message || 'Произошла ошибка при отправке данных')
    }
  })

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam) {
      setPlan(planParam)
    }
    cardNumberRef.current?.focus()
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    let formattedValue = value.trim()
    if (id === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (id === 'cardName') {
      formattedValue = value.toUpperCase().replace(/[^A-Z\s]/gi, '')
    } else if (id === 'expiryDate' && value.length <= 5) {
      formattedValue = formatExpiryDate(value)
    } else if (id === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3)
    }

    setFormData(prev => ({ ...prev, [id]: formattedValue }))
    setErrors(prev => ({ ...prev, [id]: undefined }))
    setFormError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { id } = e.currentTarget

    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown'
      ].includes(e.key) ||
      (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key))
    ) {
      return
    }

    if ((id === 'cardNumber' || id === 'cvv') && !/^\d$/.test(e.key)) {
      e.preventDefault()
    }

    if (id === 'expiryDate' && !/^\d$/.test(e.key)) {
      e.preventDefault()
    }

    if (id === 'cardName' && !/^[a-zA-Z\s]$/.test(e.key)) {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    try {
      paymentSchema.parse(formData)
      setErrors({})

      // Создаём новый объект с cardNumber без пробелов
      const dataToSend = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        plan
      }

      mutation.mutate(dataToSend)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Zod validation errors:', error.errors)
        const fieldErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(fieldErrors)
        setFormError('Пожалуйста, исправьте ошибки в форме')
      } else {
        setFormError('Произошла ошибка при обработке платежа')
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <header className='bg-white border-b'>
        <div className='container mx-auto px-6 py-4 flex items-center'>
          <Link
            href='/'
            className='flex items-center gap-2'
          >
            <Package2 className='h-6 w-6' />
            <span className='font-bold'>Система инвентаризации</span>
          </Link>
        </div>
      </header>
      <main className='flex-1 container mx-auto px-6 py-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl font-bold mb-8 text-center'>Оплата тарифа</h1>
          {formError && <div className='mb-4 p-4 bg-red-100 text-red-700 rounded'>{formError}</div>}
          <div className='grid gap-8 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Детали заказа</CardTitle>
                <CardDescription>Информация о выбранном тарифе</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Тариф:</span>
                  <span>{plan}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-medium'>Период:</span>
                  <span>1 месяц</span>
                </div>
                <Separator />
                <div className='flex justify-between text-lg font-bold'>
                  <span>Итого:</span>
                  <span>{getPlanPrice(plan)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Платежная информация</CardTitle>
                <CardDescription>Введите данные вашей карты</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='cardNumber'>Номер карты</Label>
                    <div className='relative'>
                      <CreditCard className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='cardNumber'
                        placeholder='1234 5678 9012 3456'
                        className='pl-10'
                        value={formData.cardNumber}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        inputMode='numeric'
                        maxLength={19}
                        required
                        ref={cardNumberRef}
                      />
                      {errors.cardNumber && (
                        <p className='text-sm text-red-500'>{errors.cardNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cardName'>Имя владельца</Label>
                    <Input
                      id='cardName'
                      placeholder='IVAN IVANOV'
                      value={formData.cardName}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className='uppercase'
                      required
                    />
                    {errors.cardName && <p className='text-sm text-red-500'>{errors.cardName}</p>}
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='expiryDate'>Срок действия</Label>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='expiryDate'
                          placeholder='MM/YY'
                          className='pl-10'
                          value={formData.expiryDate}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          inputMode='numeric'
                          maxLength={5}
                          required
                        />
                        {errors.expiryDate && (
                          <p className='text-sm text-red-500'>{errors.expiryDate}</p>
                        )}
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='cvv'>CVV</Label>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='cvv'
                          placeholder='123'
                          className='pl-10'
                          value={formData.cvv}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          inputMode='numeric'
                          maxLength={3}
                          required
                        />
                        {errors.cvv && <p className='text-sm text-red-500'>{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Обработка платежа...' : 'Оплатить'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<div className='w-full text-center py-10'>Загрузка...</div>}>
      <PaymentPage />
    </Suspense>
  )
}
