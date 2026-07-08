import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { fakeStoreClient } from "./client/axios-clients";
import type { CreateProduct, Product } from "../schema/product.schema";
import { useProductStore } from "../store/product.store";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

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

export function useCreateProduct() {
  const { products, addProducts } = useProductStore();

  return useMutation({
    mutationFn: async (data: CreateProduct) => {
      const response = await fakeStoreClient.post("/products", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (
        products.find(
          (product) => JSON.stringify(product) == JSON.stringify(data),
        )
      )
        return;
      else addProducts([{ ...data, id: uuidv4() }]);
    },
  });
}

export function useDeleteProduct() {
  const { removeProduct } = useProductStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await fakeStoreClient.delete(`products/${productId}`);
      return response.data;
    },
    onSettled: (data, error, productId) => {
      removeProduct(productId);
      navigate("/");
    },
  });
}

export function useUpdateProduct(productId: string) {
  const { updateProduct } = useProductStore();

  return useMutation({
    mutationFn: async (product: CreateProduct) => {
      const response = await fakeStoreClient.put(
        `products/${productId}`,
        product,
      );
      return response.data;
    },
    onSettled: (data, error, product) => {
      const updatedProduct: Product = { ...product, id: productId };
      updateProduct(updatedProduct);
    },
  });
}
