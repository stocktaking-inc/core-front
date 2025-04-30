import { DashboardHeader } from '../DashboardHeader'
import { DashboardShell } from '../Shell'

import { IDashboardPageWrapper } from './types'

export const DashboardPageWrapper = (props: IDashboardPageWrapper) => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading={props.heading}
        text={props.text}
      >
        {props.action}
      </DashboardHeader>
      {props.children}
    </DashboardShell>
  )
}
