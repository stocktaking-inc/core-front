import { OrderType } from '../types'

export const initialOrders: OrderType[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-1001',
    customer: 'Иван Смирнов',
    date: '2023-05-15',
    total: 129.99,
    status: 'Delivered',
    items: 2
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-1002',
    customer: 'Мария Иванова',
    date: '2023-05-16',
    total: 79.95,
    status: 'Shipped',
    items: 1
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-1003',
    customer: 'Алексей Петров',
    date: '2023-05-17',
    total: 249.98,
    status: 'Processing',
    items: 3
  },
  {
    id: '4',
    orderNumber: 'ORD-2023-1004',
    customer: 'Елена Сидорова',
    date: '2023-05-18',
    total: 59.99,
    status: 'Pending',
    items: 1
  },
  {
    id: '5',
    orderNumber: 'ORD-2023-1005',
    customer: 'Дмитрий Козлов',
    date: '2023-05-19',
    total: 189.97,
    status: 'Delivered',
    items: 4
  },
  {
    id: '6',
    orderNumber: 'ORD-2023-1006',
    customer: 'Анна Новикова',
    date: '2023-05-20',
    total: 99.99,
    status: 'Cancelled',
    items: 2
  },
  {
    id: '7',
    orderNumber: 'ORD-2023-1007',
    customer: 'Сергей Морозов',
    date: '2023-05-21',
    total: 149.95,
    status: 'Shipped',
    items: 3
  },
  {
    id: '8',
    orderNumber: 'ORD-2023-1008',
    customer: 'Ольга Волкова',
    date: '2023-05-22',
    total: 34.99,
    status: 'Processing',
    items: 1
  }
]
