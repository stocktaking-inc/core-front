interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  location: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | string
}

interface EditInventoryDialogProps {
  item: InventoryItem | null
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSaveAction: (item: InventoryItem) => void
}
