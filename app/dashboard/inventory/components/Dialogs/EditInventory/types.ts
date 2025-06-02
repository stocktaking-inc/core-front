export interface IEditInventoryDialog {
  item: InventoryItem | null
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSaveAction: (updatedItem: InventoryItem) => Promise<void>
}
