import type React from 'react'

import { ISupplier } from '../../types'

export interface ISuppliersTable {
  suppliers: ISupplier[]
  setSuppliersAction: React.Dispatch<React.SetStateAction<ISupplier[]>>
  isLoading: boolean
}
