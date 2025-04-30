import { IGridLayout } from './types'

export const GridLayout = ({
  children,
  className = 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
}: IGridLayout) => {
  return <div className={className}>{children}</div>
}
