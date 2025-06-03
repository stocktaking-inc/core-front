'use client'

import { useEffect, useState } from 'react'

import { InventoryTable } from './components/InventoryTable'
import { AddInventoryDialog } from './components/Dialogs/AddInventory'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'

import { fetchItems, addItem, deleteItem, editItem } from './api'

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchItems(controller.signal)
        setItems(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Не удалось загрузить данные')
        }
      } finally {
        setLoading(false)
      }
    }

    loadItems()

    return () => controller.abort()
  }, [])

  const handleAddItem = async (newItem: Omit<InventoryItem, 'id' | 'status'>) => {
    const addedItem = await addItem(newItem)
    setItems([...items, addedItem])
  }

  const handleDeleteItem = async (id: number) => {
    await deleteItem(id)
    setItems(items.filter(item => item.id !== id))
  }

  const handleEditItem = async (updatedItem: InventoryItem) => {
    const finalItem = await editItem(updatedItem)
    setItems(items.map(item => (item.id === updatedItem.id ? finalItem : item)))
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <DashboardPageWrapper
      heading='Инвентарь'
      text='Управление элементами инвентаря.'
      action={<AddInventoryDialog onAddItemAction={handleAddItem} />}
    >
      <InventoryTable
        items={items}
        onDeleteItemAction={handleDeleteItem}
        onEditItemAction={handleEditItem}
      />
    </DashboardPageWrapper>
  )
}
