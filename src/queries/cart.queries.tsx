import { useMutation } from "@tanstack/react-query";
import type { Cart } from "../schema/cart.schema";
import { fakeStoreClient } from "./client/axios-clients";
import { useCartStore } from "../store/cart.store";

export function useUpdateCart(cartId: string) {
  const { addProduct, products } = useCartStore();

  return useMutation({
    mutationFn: async (cart: Cart) => {
      const response = await fakeStoreClient.put(`/carts/${cartId}`, cart);
      return response.data;
    },
    onSuccess: (data: Cart) => {
      if (!products.find((p) => p.id === data.products[0].id))
        addProduct(data.products[0]);
    },
  });
}
