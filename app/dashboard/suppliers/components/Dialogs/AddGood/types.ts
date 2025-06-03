import { IGood } from '@/app/dashboard/suppliers/types'

export interface IAddGoodDialog {
  supplierId: number
  onAddGoodAction: (good: IGood) => void
}
