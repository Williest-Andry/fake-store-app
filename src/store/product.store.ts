import { create } from "zustand";
import type { Product } from "../schema/product.schema";

type ProductStore = {
  products: Product[];
  deletedProducts: Product[];

  addProducts: (products: Product[]) => void;
  removeProduct: (productId: string) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  deletedProducts: [],

  addProducts: (products) =>
    set((state) => ({ products: [...state.products, ...products] })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id != productId),
      deletedProducts: [
        ...state.deletedProducts,
        ...state.products.filter((p) => p.id == productId),
      ],
    })),
}));
