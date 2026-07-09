import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import Navbar from "../components/navbar";
import { useCreateProduct } from "../queries/product.queries";
import {
  CreateProductSchema,
  type CreateProduct,
} from "../schema/product.schema";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product.store";

export default function CreateProductPage() {
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
  } = useForm({ resolver: zodResolver(CreateProductSchema) });

  const { mutate: createProduct, error, isPending } = useCreateProduct();

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isExists, setIsExists] = useState(false);

  const { products } = useProductStore();

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 2000);
  }, [isPending]);

  const submitForm: SubmitHandler<CreateProduct> = (
    data: CreateProduct,
    event?: React.BaseSyntheticEvent,
  ) => {
    if (event) event.preventDefault();

    if (
      products.find((p) => {
        return (
          p.title == data.title &&
          p.price == data.price &&
          p.description == data.description &&
          p.category == data.category &&
          p.image == data.image
        );
      })
    ) {
      setIsExists(true);
      return;
    }

    setIsExists(false);
    createProduct(data);
    setTimeout(() => {
      setIsSuccessMessage(true);
    }, 500);
  };

  return (
    <>
      <Navbar />

      <section className="flex flex-col gap-30 items-center justify-center mt-10">
        <div className="flex flex-col items-center justify-center gap-20 shadow-xl rounded-xl w-120 h-200 px-6 py-5">
          <p className="font-bold text-2xl">Create your own product</p>

          <form
            className="flex flex-col items-center gap-6 w-[90%]"
            onSubmit={handleSubmit(submitForm)}
          >
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="relative flex flex-col w-97">
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

            <div className="relative flex flex-col w-97">
              <label className="text-lg font-semibold">Price</label>
              <input
                {...register("price")}
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

            <div className="relative flex flex-col w-97">
              <label className="text-lg font-semibold">Description</label>
              <textarea
                {...register("description")}
                placeholder="description"
                className="border border-gray-700 h-30 rounded-xl pl-2 w-full"
              ></textarea>
              {errors && (
                <p className="italic text-red-500">
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col w-97">
              <label className="text-lg font-semibold">Category</label>
              <input
                {...register("category")}
                placeholder="category"
                className="border border-gray-700 h-10 rounded-xl pl-2 w-full"
              ></input>
              {errors && (
                <p className="italic text-red-500">
                  {errors.category?.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col w-97">
              <label className="text-lg font-semibold">
                {"Image (URL format)"}
              </label>
              <input
                {...register("image")}
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
              value={isPending ? "..." : "Create"}
              disabled={isPending}
              className="bg-black text-white rounded-xl text-xl h-10 w-50 mt-10"
            />

            {error && <p className="italic text-red-500">{error.message}</p>}
            {isExists && (
              <p className="italic text-red-500">
                This product already exists !
              </p>
            )}
            {isSuccessMessage && (
              <p className="text-green-700 text-xl">Created successfully !</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
