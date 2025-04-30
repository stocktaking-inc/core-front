'use client'

import { TestimonialCard } from './TestimonialCard'

import { testimonials } from './mock'

export const TestimonialsSection = () => {
  return (
    <section
      id='reviews'
      className='py-12 md:py-24 lg:py-32 bg-muted/50'
    >
      <div className='text-center space-y-4'>
        <h2 className='text-3xl font-bold sm:text-4xl md:text-5xl'>Отзывы клиентов</h2>
        <p className='max-w-[900px] mx-auto text-muted-foreground md:text-xl'>
          Узнайте, что говорят наши клиенты о нашей системе управления инвентаризацией
        </p>
      </div>
      <div className='mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map(testimonial => (
          <TestimonialCard
            key={testimonial.name}
            {...testimonial}
          />
        ))}
      </div>
    </section>
  )
}
