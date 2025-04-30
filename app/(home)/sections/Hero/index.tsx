import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { HeroItem } from './HeroItem'
import { features } from './HeroItemsList'

export const HeroSection = () => {
  return (
    <section className='bg-muted/50 py-12 md:py-24 lg:py-32'>
      <div className='flex flex-col items-center text-center space-y-4 md:space-y-8'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
          Система управления инвентаризацией
        </h1>
        <p className='mx-auto max-w-[700px] text-muted-foreground md:text-xl'>
          Оптимизируйте логистические операции с помощью нашего мощного решения для управления
          запасами. Отслеживайте уровни запасов, управляйте заказами и оптимизируйте цепочку
          поставок.
        </p>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <Button
            asChild
            size='lg'
          >
            <Link href='/register'>
              Начать работу
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button
            variant='outline'
            size='lg'
            asChild
          >
            <a href='/#features'>Узнать больше</a>
          </Button>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 pt-8 md:pt-12 sm:flex-row'>
          {features.map(feature => (
            <HeroItem
              key={feature}
              text={feature}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
