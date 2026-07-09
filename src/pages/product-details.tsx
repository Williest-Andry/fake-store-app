import { NavLink, useParams } from "react-router";
import { useDeleteProduct, useProduct } from "../queries/product.queries";
import Navbar from "../components/navbar";
import Badge from "../components/badge";
import Loading from "../components/loading";
import ErrorSection from "../components/error-section";
import { useUpdateCart } from "../queries/cart.queries";
import type { Cart } from "../schema/cart.schema";
import { useCartStore } from "../store/cart.store";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product.store";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { error, isPending } = useProduct(id ?? "");

  const { products: existingProducts } = useProductStore();

  const existingProduct = existingProducts.find((p) => p.id == id);

  const {
    mutate: updateCart,
    isPending: updatePending,
    error: updateError,
  } = useUpdateCart("0"); // mock

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const [isDeletable, setIsDeletable] = useState(true);

  const { products: cartProducts } = useCartStore();

  const isAlreadyInCart = () => {
    return cartProducts.find((p) => p.id === existingProduct?.id)
      ? true
      : false;
  };

  const handleAddToCart = () => {
    let userCart: Cart = {
      id: "0", // mock
      userId: "0", // mock
      products: [],
    };

    userCart.products.push(existingProduct!);
    updateCart(userCart);

    setTimeout(() => {
      setIsSuccessMessage(true);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 4000);
  }, [isPending]);

  const { mutate: deleteProduct, isPending: deletePending } =
    useDeleteProduct();

  const handleDelete = () => {
    if (isAlreadyInCart()) {
      setIsDeletable(false);
      return;
    }
    deleteProduct(existingProduct?.id ?? "");
  };

  if (error || !existingProduct)
    return <ErrorSection showReloadButton={false} />;

  if (isPending) return <Loading />;

  return (
    <>
      <Navbar />

      <section className="font-work flex flex-col gap-20 xl:gap-10 mt-20  xl:h-180 justify-between items-center">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start xl:justify-start gap-20  w-full h-full">
          <div className="bg-gray-100 w-full h-full xl:w-[50%] flex items-center justify-center ">
            <img
              src={existingProduct.image}
              alt={`${existingProduct.title} image`}
              className="w-80 lg:w-100"
            />
          </div>

          <div className="flex flex-col items-center xl:items-start gap-10 text-center xl:text-left">
            <div className="flex flex-col items-center xl:items-start gap-4  lg:w-180 mt-20">
              <p className="font-bold text-xl lg:text-3xl">
                {existingProduct.title}
              </p>
              <Badge value={existingProduct.category} w="50" />
              <p className="font-bold">{existingProduct.price}</p>
              <p className="text-md lg:text-xl">
                {existingProduct.description}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 w-40 lg:w-80">
              <button
                className={
                  isAlreadyInCart()
                    ? "bg-black text-white w-full h-15 rounded-xl text-sm lg:text-xl opacity-50 cursor-not-allowed "
                    : "bg-black text-white w-full h-15 rounded-xl text-sm lg:text-xl cursor-pointer"
                }
                disabled={isAlreadyInCart()}
                onClick={handleAddToCart}
              >
                {updatePending ? "..." : "Add to Cart"}
              </button>

              {isSuccessMessage && (
                <p className="text-sm lg:text-xl text-green-700">
                  Added successfully !
                </p>
              )}
              {updateError && (
                <p className="text-sm lg:text-xl text-red-700">
                  {updateError.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <NavLink
            to={`/modify-product/${existingProduct.id}`}
            className="bg-gray-500 text-white w-40 lg:w-75 h-15 rounded-xl text-sm lg:text-xl cursor-pointer flex items-center justify-center"
          >
            Modify
          </NavLink>

          <button
            className="bg-red-500 text-white  w-40 lg:w-75 h-15 rounded-xl text-sm lg:text-xl cursor-pointer"
            onClick={handleDelete}
          >
            {deletePending ? "..." : "Delete"}
          </button>
        </div>
        {!isDeletable && (
          <p className="text-sm lg:text-xl text-red-700">
            This product is still in the shopping cart
          </p>
        )}
      </section>
    </>
  );
}
