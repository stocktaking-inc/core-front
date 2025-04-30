import { ReactNode } from 'react'

export interface IDashboardPageWrapper {
  heading: string
  text: string
  action?: ReactNode
  children: ReactNode
}
