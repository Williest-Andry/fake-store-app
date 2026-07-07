import { create } from "zustand";
import type { Product } from "../schema/product.schema";

type ProductStore = {
  products: Product[];
  addProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  addProducts: (products) =>
    set((state) => ({ products: [...state.products, ...products] })),
}));
