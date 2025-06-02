interface InventoryItem {
  id: number
  name: string
  article: string
  category: string
  quantity: number
  locationId: number | null
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | string
  supplierId: number
}

interface IInventoryTable {
  items: InventoryItem[] | null
  onDeleteItemAction: (id: number) => Promise<void>
  onEditItemAction: (updatedItem: InventoryItem) => Promise<void>
}
