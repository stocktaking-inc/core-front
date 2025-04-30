'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PricingCard } from './PricingCard'

import { plans } from './mock'

export const PricingSection = () => {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = new URLSearchParams({
      plan: selectedPlan ?? '',
      company: formData.get('company') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string
    }).toString()
    router.push(`/payment?${query}`)
  }

  return (
    <section
      id='pricing'
      className='py-12 md:py-24 lg:py-32 bg-background'
    >
      <div className='text-center space-y-4'>
        <h2 className='text-3xl font-bold sm:text-4xl md:text-5xl'>Тарифные планы</h2>
        <p className='max-w-[900px] mx-auto text-muted-foreground md:text-xl'>
          Выберите подходящий тарифный план для вашего бизнеса
        </p>
      </div>
      <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3'>
        {plans.map(plan => (
          <PricingCard
            key={plan.title}
            {...plan}
            onSelectAction={handleSelect}
          />
        ))}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{selectedPlan ? `Оформление плана "${selectedPlan}"` : 'хуй'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className='space-y-4 py-4'
          >
            {['company', 'name', 'email', 'phone'].map(field => (
              <div
                key={field}
                className='space-y-2'
              >
                <Label htmlFor={field}>
                  {field === 'company'
                    ? 'Название компании'
                    : field === 'name'
                      ? 'Контактное лицо'
                      : field === 'email'
                        ? 'Email'
                        : 'Телефон'}
                </Label>
                <Input
                  id={field}
                  name={field}
                  required
                  type={field === 'email' ? 'email' : 'text'}
                />
              </div>
            ))}
            <Button
              type='submit'
              className='w-full'
            >
              Продолжить
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
