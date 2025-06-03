'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

import { SuppliersTable } from './components/SuppliersTable'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'

import { AddSupplierDialog } from './components/Dialogs'
import { ISupplier } from './types'
import { suppliersApi } from './api'

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await suppliersApi.getSuppliers()
        setSuppliers(data)
      } catch (error: any) {
        toast.error('Ошибка', {
          description: error.message,
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchSuppliers()
  }, [])

  const handleAddSupplier = (newSupplier: ISupplier) => {
    setSuppliers([...suppliers, newSupplier])
  }

  return (
    <DashboardPageWrapper
      heading="Поставщики"
      text="Управление поставщиками продукции."
      action={<AddSupplierDialog onAddSupplier={handleAddSupplier} />}
    >
      <SuppliersTable suppliers={suppliers} setSuppliers={setSuppliers} isLoading={isLoading} />
    </DashboardPageWrapper>
  )
}
