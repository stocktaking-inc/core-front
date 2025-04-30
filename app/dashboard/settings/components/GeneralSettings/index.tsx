'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'

import { initialSettings } from './constants'

export const GeneralSettings = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState(initialSettings)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const settingsChanged = Object.keys(initialSettings).some(
      key =>
        initialSettings[key as keyof typeof initialSettings] !==
        settings[key as keyof typeof settings]
    )
    setHasChanges(settingsChanged)
  }, [settings])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target
  //   setSettings(prev => ({ ...prev, [id]: value }))
  // }

  const handleSelectChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      Object.assign(initialSettings, settings)
      setHasChanges(false)
      toast({
        title: 'Настройки обновлены',
        description: 'Общие настройки системы были успешно обновлены.'
      })
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='language'>Язык</Label>
          <Select
            value={settings.language}
            onValueChange={value => handleSelectChange('language', value)}
          >
            <SelectTrigger id='language'>
              <SelectValue placeholder='Выберите язык' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ru'>Русский</SelectItem>
              <SelectItem value='en'>English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='timezone'>Часовой пояс</Label>
          <Select
            value={settings.timezone}
            onValueChange={value => handleSelectChange('timezone', value)}
          >
            <SelectTrigger id='timezone'>
              <SelectValue placeholder='Выберите часовой пояс' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Europe/Moscow'>Москва (GMT+3)</SelectItem>
              <SelectItem value='Europe/Kaliningrad'>Калининград (GMT+2)</SelectItem>
              <SelectItem value='Asia/Yekaterinburg'>Екатеринбург (GMT+5)</SelectItem>
              <SelectItem value='Asia/Novosibirsk'>Новосибирск (GMT+7)</SelectItem>
              <SelectItem value='Asia/Vladivostok'>Владивосток (GMT+10)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='dateFormat'>Формат даты</Label>
          <Select
            value={settings.dateFormat}
            onValueChange={value => handleSelectChange('dateFormat', value)}
          >
            <SelectTrigger id='dateFormat'>
              <SelectValue placeholder='Выберите формат даты' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='DD.MM.YYYY'>DD.MM.YYYY</SelectItem>
              <SelectItem value='MM/DD/YYYY'>MM/DD/YYYY</SelectItem>
              <SelectItem value='YYYY-MM-DD'>YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='currency'>Валюта</Label>
          <Select
            value={settings.currency}
            onValueChange={value => handleSelectChange('currency', value)}
          >
            <SelectTrigger id='currency'>
              <SelectValue placeholder='Выберите валюту' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='RUB'>Российский рубль (₽)</SelectItem>
              <SelectItem value='USD'>Доллар США ($)</SelectItem>
              <SelectItem value='EUR'>Евро (€)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isLoading || !hasChanges}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
        </Button>
      </div>
    </form>
  )
}
