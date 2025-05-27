'use client'

import { Footer, Header } from '@/components/layout'
import {
  CTASection,
  FeaturesSection,
  HeroSection,
  PricingSection,
  TestimonialsSection
} from './sections'

import {navLinks} from './constants'

export default function Home() {
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
