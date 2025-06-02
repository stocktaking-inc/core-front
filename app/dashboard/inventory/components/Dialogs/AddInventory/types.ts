interface IAddInventoryDialog {
  onAddItemAction: (newItem: Omit<InventoryItem, 'id' | 'status'>) => Promise<void>
}
