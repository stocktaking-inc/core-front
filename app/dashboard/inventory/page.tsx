'use client'

import { useState } from 'react'
import { InventoryTable } from './components/InventoryTable'
import { AddInventoryDialog } from './components/Dialogs/AddInventory'
import { DashboardPageWrapper } from '../components/DashboardPageWrapper'
import { initialInventoryItems } from './components/InventoryTable/mock'

import { getItemStatus } from '@/utils/Badges'

const normalizedInitialItems = initialInventoryItems.map(item => ({
  ...item,
  status: getItemStatus(item.quantity)
}))

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(normalizedInitialItems)

  const handleAddItem = (newItem: InventoryItem) => {
    setItems([...items, newItem])
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleEditItem = (updatedItem: InventoryItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)))
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
