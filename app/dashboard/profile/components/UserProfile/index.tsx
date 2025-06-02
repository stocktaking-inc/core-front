'use client'

import type React from 'react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { toast } from 'sonner'

export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Иван Смирнов',
    email: 'ivan.smirnov@example.com',
    phone: '+7 (999) 123-4567',
    company: 'ООО Техно-Склад',
    position: 'Менеджер по логистике',
    bio: 'Опытный специалист по управлению запасами с 5-летним стажем работы в сфере логистики.'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    if (id === 'phone') {
      let formattedPhone = value.replace(/\D/g, '')

      if (formattedPhone.startsWith('8')) {
        formattedPhone = '7' + formattedPhone.substring(1)
      }

      if (formattedPhone && !formattedPhone.startsWith('7')) {
        formattedPhone = '7' + formattedPhone
      }

      if (formattedPhone.length > 0) {
        formattedPhone = '+' + formattedPhone

        if (formattedPhone.length > 2) {
          formattedPhone = formattedPhone.substring(0, 2) + ' (' + formattedPhone.substring(2)
        }

        if (formattedPhone.length > 7) {
          formattedPhone = formattedPhone.substring(0, 7) + ') ' + formattedPhone.substring(7)
        }

        if (formattedPhone.length > 13) {
          formattedPhone = formattedPhone.substring(0, 13) + '-' + formattedPhone.substring(13)
        }

        if (formattedPhone.length > 16) {
          formattedPhone = formattedPhone.substring(0, 16) + '-' + formattedPhone.substring(16, 18)
        }
      }

      setFormData(prev => ({ ...prev, [id]: formattedPhone }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.info('Профиль обновлен', {
        description: 'Ваши данные профиля были успешно обновлены.'
      })
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      <div className='flex flex-col gap-6 sm:flex-row'>
        <div className='flex flex-col items-center gap-4'>
          <Avatar className='h-24 w-24'>
            <AvatarImage
              src='/placeholder.svg?height=96&width=96'
              alt={formData.name}
            />
            <AvatarFallback>ИС</AvatarFallback>
          </Avatar>
          <Button
            variant='outline'
            size='sm'
          >
            Изменить фото
          </Button>
        </div>
        <div className='flex-1 space-y-4'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Полное имя</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Телефон</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='company'>Компания</Label>
              <Input
                id='company'
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='position'>Должность</Label>
            <Input
              id='position'
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='bio'>О себе</Label>
            <Textarea
              id='bio'
              value={formData.bio}
              onChange={handleChange}
              className='min-h-[100px]'
            />
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </div>
    </form>
  )
}
