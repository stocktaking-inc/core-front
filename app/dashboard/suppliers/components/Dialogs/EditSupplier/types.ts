import type React from 'react'

import { ISupplier } from '../../../types'

export interface IEditSupplierDialog {
  open: boolean
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  selectedSupplier: ISupplier | null
  onClick: () => void
}
