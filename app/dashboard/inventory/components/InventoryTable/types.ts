interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  location: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | string
}

interface IInventoryTable {
  items: InventoryItem[]
  onDeleteItemAction: (id: string) => void
  onEditItemAction: (updatedItem: InventoryItem) => void
}
