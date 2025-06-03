interface IEditWarehouseDialog {
  item: WarehouseItem
  onSaveAction: (updatedItem: WarehouseItem) => Promise<void>
}
