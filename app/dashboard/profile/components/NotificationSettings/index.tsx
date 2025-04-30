'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

import { initialNotifications, notificationLabels } from './constants'

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState<Notifications>(initialNotifications)
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const notificationsChanged =
      JSON.stringify(initialNotifications) !== JSON.stringify(notifications)
    setHasChanges(notificationsChanged)
  }, [notifications])

  const handleToggle = (type: NotificationType, key: NotificationCategory) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key]
      }
    }))
  }

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      Object.assign(initialNotifications, notifications)
      setIsLoading(false)
      setHasChanges(false)
      toast({
        title: 'Настройки уведомлений обновлены',
        description: 'Ваши настройки уведомлений были успешно сохранены.'
      })
    }, 1000)
  }

  return (
    <div className='space-y-6'>
      {(['email', 'push'] as NotificationType[]).map(type => (
        <div
          key={type}
          className={type === 'push' ? 'border-t pt-6' : ''}
        >
          <h3 className='text-lg font-medium'>
            {type === 'email' ? 'Email уведомления' : 'Push-уведомления'}
          </h3>
          <p className='text-sm text-muted-foreground'>
            {type === 'email'
              ? 'Настройте, какие email уведомления вы хотите получать.'
              : 'Настройте, какие push-уведомления вы хотите получать в браузере.'}
          </p>

          <div className='mt-4 space-y-4'>
            {(Object.keys(notificationLabels) as NotificationCategory[]).map(key => (
              <div
                key={key}
                className='flex items-center justify-between'
              >
                <div className='space-y-0.5'>
                  <Label htmlFor={`${type}-${key}`}>{notificationLabels[key].title}</Label>
                  <p className='text-sm text-muted-foreground'>
                    {notificationLabels[key].description}
                  </p>
                </div>
                <Switch
                  id={`${type}-${key}`}
                  checked={notifications[type][key]}
                  onCheckedChange={() => handleToggle(type, key)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className='flex justify-end'>
        <Button
          onClick={handleSave}
          disabled={isLoading || !hasChanges}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
        </Button>
      </div>
    </div>
  )
}
