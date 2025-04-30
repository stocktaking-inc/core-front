import { ISupplier } from '../../types'

export interface IViewDetailsDialog {
  open: boolean
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void
  selectedSupplier: ISupplier | null
  statusText: string
  onClick: () => void
}
