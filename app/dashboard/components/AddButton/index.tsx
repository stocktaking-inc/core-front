import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { IAddButton } from './types'

export function AddButton({ label, ...props }: IAddButton) {
  return (
    <Button {...props}>
      <Plus className='mr-2 h-4 w-4' /> {label}
    </Button>
  )
}
