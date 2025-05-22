import { IFooterSection } from './types'

export const footerSections: IFooterSection[] = [
  {
    title: 'Продукт',
    links: [
      { label: 'Возможности', href: '/#features' },
      { label: 'Тарифы', href: '/#pricing' },
      { label: 'Демо', href: '#' },
      { label: 'Документация', href: '#' }
    ]
  },
  {
    title: 'Поддержка',
    links: [
      { label: 'Центр поддержки', href: '#' },
      { label: 'Статус системы', href: '#' },
      { label: 'Обучение', href: '#' }
    ]
  }
]
