import { Package2 } from 'lucide-react'
import Link from 'next/link'

import { routes } from '@/utils/shared/api/routes'

import { FooterSection } from './components/FooterSection'
import { footerSections } from './components/FooterSection/constants'
import { getCopyright } from './copyright'

export const Footer = () => {
  return (
    <footer className='w-full border-t bg-background py-12'>
      <div className='px-4 md:px-6'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <Package2 className='h-6 w-6' />
              <span className='font-bold'>Система инвентаризации</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Оптимизируйте логистические операции с помощью нашего мощного решения для управления
              запасами.
            </p>
          </div>
          {footerSections.map(section => (
            <FooterSection
              key={section.title}
              {...section}
            />
          ))}
        </div>
        <div className='mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <p className='text-sm text-muted-foreground'>{getCopyright()}</p>
            <div className='flex gap-4'>
              <Link
                href={routes.TERMS}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Условия использования
              </Link>
              <Link
                href={routes.POLICY}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Политика конфиденциальности
              </Link>
              <Link
                href={routes.OFFER}
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
