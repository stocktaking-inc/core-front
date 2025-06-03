export interface ISupplier {
  supplierId: number;
  name: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  status: 'Active' | 'Inactive';
  goods: IGood[];
  productsCount?: number;
}

export interface IGood {
  id: number;
  name: string;
  article: string;
  purchasePrice: number;
  category: string;
  supplierId: number;
}

export interface IAddSupplierDialog {
  onAddSupplier?: (supplier: ISupplier) => void;
}

export interface IEditDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  selectedSupplier: ISupplier | null;
  onClick: () => void;
}

export interface IProductDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSupplier: ISupplier | null;
  onClick: () => void;
}

export interface IViewDetailsDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSupplier: ISupplier | null;
  statusText: string;
  onClick: () => void;
}
