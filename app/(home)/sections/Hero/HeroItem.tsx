import { ArrowRight } from 'lucide-react'

export const HeroItem = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center space-x-2'>
      <ArrowRight className='h-5 w-5 text-primary' />
      <span>{text}</span>
    </div>
  )
}
