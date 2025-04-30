'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

export const TestimonialCard = ({ name, role, text, initials }: TestimonialCardProps) => {
  return (
    <Card className='border shadow-md'>
      <CardContent className='p-6 flex flex-col items-center gap-4'>
        <Avatar className='h-16 w-16'>
          <AvatarImage
            src='/placeholder.svg?height=64&width=64'
            alt={name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className='text-center'>
          <p className='mb-4 italic text-muted-foreground'>{text}</p>
          <p className='font-semibold'>{name}</p>
          <p className='text-sm text-muted-foreground'>{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
