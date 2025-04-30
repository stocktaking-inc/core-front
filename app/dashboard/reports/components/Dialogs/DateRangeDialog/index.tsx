'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { addDays, format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from 'recharts'

import { IDateRangeDialog } from './types'

export const DateRangeDialog = ({ onDateChange }: IDateRangeDialog) => {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 4, 1),
    to: new Date()
  })

  const handlePresetChange = (preset: string) => {
    const today = new Date()

    switch (preset) {
      case 'last-7-days':
        setDate({ from: addDays(today, -7), to: today })
        break
      case 'last-30-days':
        setDate({ from: addDays(today, -30), to: today })
        break
      case 'this-month':
        setDate({ from: new Date(today.getFullYear(), today.getMonth(), 1), to: today })
        break
      case 'last-month':
        setDate({
          from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
          to: new Date(today.getFullYear(), today.getMonth(), 0)
        })
        break
      case 'this-year':
        setDate({ from: new Date(today.getFullYear(), 0, 1), to: today })
        break
    }
  }

  const handleApply = () => {
    if (onDateChange) {
      onDateChange(date)
    }
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'dd.MM.yyyy')} - {format(date.to, 'dd.MM.yyyy')}
              </>
            ) : (
              format(date.from, 'dd.MM.yyyy')
            )
          ) : (
            'Выберите даты'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Выбор диапазона дат</DialogTitle>
          <DialogDescription>Выберите период для отображения отчетов.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label>Пресеты</Label>
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder='Выберите период' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='last-7-days'>Последние 7 дней</SelectItem>
                <SelectItem value='last-30-days'>Последние 30 дней</SelectItem>
                <SelectItem value='this-month'>Текущий месяц</SelectItem>
                <SelectItem value='last-month'>Прошлый месяц</SelectItem>
                <SelectItem value='this-year'>Текущий год</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label>Диапазон дат</Label>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
          <Button onClick={handleApply}>Применить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
