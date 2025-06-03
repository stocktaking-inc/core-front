'use client'

import { useEffect, useState } from 'react'
import { WarehousesTable } from './components/WarehousesTable'
import { AddWarehouseDialog } from './components/Dialogs/AddWarehouse'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { fetchWarehouses, addWarehouse, editWarehouse } from './api'

export default function WarehousesPage() {
  const [items, setItems] = useState<IWarehouse[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const loadWarehouses = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchWarehouses(controller.signal)
        setItems(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Не удалось загрузить склады')
        }
      } finally {
        setLoading(false)
      }
    }

    loadWarehouses()

    return () => controller.abort()
  }, [])

  const handleAddItem = async (newItem: Omit<IWarehouse, 'id'>) => {
    const addedItem = await addWarehouse(newItem)
    setItems([...items, addedItem])
  }

  const handleEditItem = async (updatedItem: IWarehouse) => {
    const finalItem = await editWarehouse(updatedItem)
    setItems(items.map(item => (item.id === updatedItem.id ? finalItem : item)))
  }

  const handleDeleteItem = async (id: number) => {
    setItems(items.filter(item => item.id !== id)) // Обновляем таблицу сразу
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <DashboardPageWrapper
      heading='Склады'
      text='Управление складами.'
      action={<AddWarehouseDialog onAddItemAction={handleAddItem} />}
    >
      <WarehousesTable
        items={items}
        onEditWarehouseAction={handleEditItem}
        onDeleteWarehouseAction={handleDeleteItem}
      />
    </DashboardPageWrapper>
  )
}
