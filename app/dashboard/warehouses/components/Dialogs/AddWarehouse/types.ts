interface AddWarehouseDialogProps {
  onAddItemAction: (newItem: Omit<WarehouseItem, 'id'>) => Promise<void>
}
