import { create } from "zustand";
import { type Cart } from "../schema/cart.schema";
import type { Product } from "../schema/product.schema";

type CartStore = {
  addProduct: (product: Product) => void;
} & Cart;

export const useCartStore = create<CartStore>((set) => ({
  id: "",
  userId: "",
  products: [],

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
