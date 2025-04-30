'use client'

import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const PricingCard = ({
  title,
  description,
  price,
  features,
  highlighted,
  onSelectAction
}: IPricingCard) => {
  return (
    <Card className={`flex flex-col ${highlighted ? 'border-primary' : ''}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className='mt-4 text-4xl font-extrabold'>
          {price} <span className='text-xl font-semibold'>/мес</span>
        </div>
      </CardHeader>
      <CardContent className='flex-1'>
        <ul className='space-y-2'>
          {features.map(feature => (
            <li
              key={feature}
              className='flex items-center'
            >
              <Check className='mr-2 h-4 w-4 text-green-500' />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          onClick={() => onSelectAction(title)}
        >
          Выбрать план
        </Button>
      </CardFooter>
    </Card>
  )
}
