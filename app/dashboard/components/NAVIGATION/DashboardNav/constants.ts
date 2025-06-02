import { BarChart3, Box, ClipboardList, Home, Settings, ShoppingCart, Users } from 'lucide-react'

export const NAV_ITEMS = [
  {
    title: 'Дашборд',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'Инвентарь',
    href: '/dashboard/inventory',
    icon: Box
  },
  {
    title: 'Заказы',
    href: '/dashboard/orders',
    icon: ShoppingCart
  },
  {
    title: 'Поставщики',
    href: '/dashboard/suppliers',
    icon: ClipboardList
  },
  {
    title: 'Клиенты',
    href: '/dashboard/customers',
    icon: Users
  },
  {
    title: 'Отчеты',
    href: '/dashboard/reports',
    icon: BarChart3
  }
]
