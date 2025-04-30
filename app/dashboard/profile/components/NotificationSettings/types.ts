type NotificationCategory = 'marketing' | 'inventory' | 'orders' | 'system'
type NotificationType = 'email' | 'push'

type Notifications = {
  email: Record<NotificationCategory, boolean>
  push: Record<NotificationCategory, boolean>
}
