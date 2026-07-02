import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fakeStoreClient } from "./client/axios-clients";
import type { Product } from "../schema/product.schema";

export function useProducts(): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fakeStoreClient.get("/products");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string): UseQueryResult<Product, Error> {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await fakeStoreClient.get(`/products/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
