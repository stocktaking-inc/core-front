interface IWarehousesTable {
  items: IWarehouse[];
  onEditWarehouseAction: (updatedItem: IWarehouse) => Promise<void>;
  onDeleteWarehouseAction: (id: number) => Promise<void>;
}
