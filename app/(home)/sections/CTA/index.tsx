import { Button } from '@/components/ui/button'

export const CTASection = () => {
  return (
    <section
      id='start'
      className='py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground'
    >
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Готовы оптимизировать ваш инвентарь?
        </h2>
        <p className='mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl'>
          Начните использовать нашу систему управления инвентаризацией уже сегодня и повысьте
          эффективность вашего бизнеса.
        </p>
        <div className='flex flex-col gap-2 min-[400px]:flex-row'>
          <Button
            size='lg'
            variant='secondary'
          >
            Начать бесплатный период
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10'
          >
            Связаться с отделом продаж
          </Button>
        </div>
      </div>
    </section>
  )
}
