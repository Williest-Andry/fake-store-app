import type { Product } from "./product.schema";

export type Cart = {
  id: string;
  userId: string;
  products: Product[];
};
