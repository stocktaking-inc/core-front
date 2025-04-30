import { ISupplier } from '../../types'

export interface IProductDialog {
  open: boolean
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void
  selectedSupplier: ISupplier | null
  onClick: () => void
}
