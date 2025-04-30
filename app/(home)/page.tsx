'use client'

import { Footer, Header } from '@/components/layout'
import {
  CTASection,
  FeaturesSection,
  HeroSection,
  PricingSection,
  TestimonialsSection
} from './sections'

export default function Home() {
  const navLinks = [
    { href: '/#features', label: 'Возможности' },
    { href: '/#pricing', label: 'Тарифы' },
    { href: '/#reviews', label: 'Отзывы' },
    { href: '/#start', label: 'Попробовать' }
  ]

  return (
    <>
      <Header navLinks={navLinks} />
      <main className='flex-1'>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
