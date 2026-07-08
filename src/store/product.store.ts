import { create } from "zustand";
import type { Product } from "../schema/product.schema";

type ProductStore = {
  products: Product[];
  deletedProducts: Product[];
  updatedProducts: Product[];

  addProducts: (products: Product[]) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  deletedProducts: [],
  updatedProducts: [],

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
  updateProduct: (product) =>
    set((state) => ({
      products: [...state.products.filter((p) => p.id != product.id), product],
      updatedProducts: [
        ...state.updatedProducts,
        ...state.products.filter((p) => p.id == product.id),
      ],
    })),
}));
