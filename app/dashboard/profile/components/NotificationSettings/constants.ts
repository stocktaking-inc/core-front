export const notificationLabels: Record<
  NotificationCategory,
  { title: string; description: string }
> = {
  marketing: {
    title: 'Маркетинговые сообщения',
    description: 'Получайте информацию о новых функциях и специальных предложениях.'
  },
  inventory: {
    title: 'Уведомления об инвентаре',
    description: 'Получайте уведомления о низком уровне запасов и изменениях в инвентаре.'
  },
  orders: {
    title: 'Уведомления о заказах',
    description: 'Получайте уведомления о новых заказах и изменениях статуса.'
  },
  system: {
    title: 'Системные уведомления',
    description: 'Важные уведомления о вашем аккаунте и системе.'
  }
}

export const initialNotifications: Notifications = {
  email: {
    marketing: true,
    inventory: true,
    orders: true,
    system: true
  },
  push: {
    marketing: true,
    inventory: true,
    orders: true,
    system: true
  }
}
