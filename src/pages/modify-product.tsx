import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import Navbar from "../components/navbar";
import { useProduct, useUpdateProduct } from "../queries/product.queries";
import {
  CreateProductSchema,
  type CreateProduct,
  type Product,
} from "../schema/product.schema";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorSection from "../components/error-section";
import Loading from "../components/loading";
import { useProductStore } from "../store/product.store";
import { useCartStore } from "../store/cart.store";

export default function ModifyProductPage() {
  const { id } = useParams();

  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm({ resolver: zodResolver(CreateProductSchema) });

  const { mutate: updateProduct, isPending: updatePending } = useUpdateProduct(
    id ?? "",
  );

  const { products } = useProductStore();

  const product = products.find((p) => p.id == id);

  const { isPending, error } = useProduct(id ?? "");

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 2000);
  }, [updatePending]);

  const { products: cartProducts, setProducts } = useCartStore();

  const submitForm: SubmitHandler<CreateProduct> = async (
    data: CreateProduct,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (event) event.preventDefault();
    updateProduct(data);

    const updatedProduct = products.find((p) => p.id == id) as Product;
    let currentProducts = cartProducts.filter((p) => p.id != updatedProduct.id);
    const finalProduct: Product = {
      ...data,
      id: id ?? "",
    };
    currentProducts.push(finalProduct);
    setProducts(currentProducts);

    setTimeout(() => {
      setIsSuccessMessage(true);
    }, 500);
  };

  if (error) return <ErrorSection />;

  if (isPending) return <Loading />;

  return (
    <>
      <Navbar />

      <section className="flex flex-col gap-30 items-center justify-center mt-10">
        <div className="flex flex-col items-center justify-center gap-20 shadow-xl rounded-xl w-220 h-200 px-6 py-5">
          <p className="font-bold text-2xl">Modify the product</p>

          <form
            className="flex flex-col items-center gap-6 w-[90%]"
            onSubmit={handleSubmit(submitForm)}
          >
            <Controller
              name="title"
              control={control}
              defaultValue={product?.title}
              render={({ field }) => (
                <div className="relative flex flex-col w-197">
                  <label className="text-lg font-semibold">Title</label>
                  <input
                    {...field}
                    placeholder="title"
                    className="border border-gray-700 h-10 rounded-xl pl-2 w-full"
                  ></input>
                  {errors && (
                    <p className="italic text-red-500">
                      {errors.title?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="relative flex flex-col w-197">
              <label className="text-lg font-semibold">Price</label>
              <input
                {...register("price")}
                defaultValue={product?.price}
                min={0}
                placeholder="price"
                className="border border-gray-700 h-10 rounded-xl pl-2 w-full"
                type="number"
                step={0.01}
              ></input>
              {errors && (
                <p className="italic text-red-500">{errors.price?.message}</p>
              )}
            </div>

            <div className="relative flex flex-col w-197">
              <label className="text-lg font-semibold">Description</label>
              <textarea
                {...register("description")}
                defaultValue={product?.description}
                placeholder="description"
                className="border border-gray-700 h-30 rounded-xl pl-2 w-full"
              ></textarea>
              {errors && (
                <p className="italic text-red-500">
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col w-197">
              <label className="text-lg font-semibold">Category</label>
              <input
                {...register("category")}
                defaultValue={product?.category}
                placeholder="category"
                className="border border-gray-700 h-10 rounded-xl pl-2 w-full"
              ></input>
              {errors && (
                <p className="italic text-red-500">
                  {errors.category?.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col w-197">
              <label className="text-lg font-semibold">
                {"Image (URL format)"}
              </label>
              <input
                {...register("image")}
                defaultValue={product?.image}
                placeholder="image"
                className="border border-gray-700 h-10 rounded-xl pl-2 w-full"
                type="url"
              ></input>
              {errors && (
                <p className="italic text-red-500">{errors.image?.message}</p>
              )}
            </div>

            <input
              type="submit"
              value={updatePending ? "..." : "Modify"}
              disabled={updatePending}
              className="bg-black text-white rounded-xl text-xl h-10 w-50 mt-10"
            />

            {isSuccessMessage && (
              <p className="text-green-700 text-xl">Modified successfully !</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
