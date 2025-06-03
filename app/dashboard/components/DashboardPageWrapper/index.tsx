import { DashboardHeader } from '../DashboardHeader'
import { DashboardShell } from '../Shell'

import { IDashboardPageWrapper } from './types'

export const DashboardPageWrapper = ({
  heading,
  text,
  action,
  children,
  userNav
}: IDashboardPageWrapper) => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading={heading}
        text={text}
      >
        {action}
        {userNav && <div className='user-nav'>{userNav}</div>}
      </DashboardHeader>
      {children}
    </DashboardShell>
  )
}
