import { Product } from "../inventory-list/inventory-list.interface";

export interface ProductListProp {
  product: Product;
  handleReduceStock: (id: string, currentStock: number, sold: number) => void;
  handleDeleteProduct: (id: string) => void;
  openEditModal: (product: Product) => void;
  handleUndo: () => void;
  lastAction: {
    id: string;
    previousStock: number;
    previousSold: number;
  } | null;
}
