import { BarChart3, Package, ShoppingCart, Truck } from 'lucide-react'

export const features = [
  {
    icon: <Package className='h-12 w-12 text-primary' />,
    title: 'Контроль запасов',
    description:
      'Отслеживайте уровни запасов в режиме реального времени и получайте уведомления о низком уровне запасов'
  },
  {
    icon: <ShoppingCart className='h-12 w-12 text-primary' />,
    title: 'Обработка заказов',
    description:
      'Создавайте и отслеживайте заказы, генерируйте счета и управляйте статусами заказов'
  },
  {
    icon: <Truck className='h-12 w-12 text-primary' />,
    title: 'Логистика поставщиков',
    description:
      'Управляйте отношениями с поставщиками, отслеживайте поставки и оптимизируйте закупки'
  },
  {
    icon: <BarChart3 className='h-12 w-12 text-primary' />,
    title: 'Бизнес-аналитика',
    description: 'Получайте подробные отчеты и аналитику для принятия обоснованных бизнес-решений'
  }
]
