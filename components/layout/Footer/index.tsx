import Link from 'next/link'

import { Package2 } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className='w-full border-t bg-background py-12'>
      <div className='px-4 md:px-6'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Package2 className='h-6 w-6' />
              <span className='font-bold'>Система инвентаризации</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Оптимизируйте логистические операции с помощью нашего мощного решения для управления
              запасами.
            </p>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-medium'>Продукт</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/#features'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Возможности
                </Link>
              </li>
              <li>
                <Link
                  href='/#pricing'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Тарифы
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Демо
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Документация
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-medium'>Поддержка</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Центр поддержки
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Статус системы
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Обучение
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t pt-8'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <p className='text-sm text-muted-foreground'>
              © 2025 Система инвентаризации. Все права защищены.
            </p>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Условия использования
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Политика конфиденциальности
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
