import { useParams } from "react-router";
import { useProduct } from "../queries/product.queries";
import Navbar from "../components/navbar";
import Badge from "../components/badge";
import Loading from "../components/loading";
import ErrorSection from "../components/error-section";
import { useUpdateCart } from "../queries/cart.queries";
import type { Cart } from "../schema/cart.schema";
import { useCartStore } from "../store/cart.store";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, error, isPending } = useProduct(id ?? "");

  const {
    mutate: updateCart,
    isPending: updatePending,
    error: updateError,
  } = useUpdateCart("0"); // mock

  const { products } = useCartStore();

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleAddToCart = () => {
    let userCart: Cart = {
      id: "0", // mock
      userId: "0", // mock
      products: [],
    };

    userCart.products.push(product!);
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

  const isAlreadyInCart = () => {
    return product && products.find((p) => p.id === product.id) ? true : false;
  };

  if (error) return <ErrorSection />;

  if (isPending) return <Loading />;

  return (
    <>
      <Navbar />

      <section className="font-work flex flex-col gap-50 mt-20  h-180 justify-between items-center">
        <div className="flex justify-start gap-20  w-full h-full">
          <div className="bg-gray-100 w-[50%] flex items-center justify-center ">
            <img
              src={product.image}
              alt={`${product.title} image`}
              className="w-100"
            />
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 w-180 mt-20">
              <p className="font-bold text-3xl">{product.title}</p>
              <Badge value={product.category} w="50" />
              <p className="font-bold">{product.price}</p>
              <p className="text-xl">{product.description}</p>
            </div>

            <div className="flex flex-col items-center gap-4 w-80">
              <button
                className={
                  isAlreadyInCart()
                    ? "bg-black text-white w-full h-15 rounded-xl text-xl opacity-50 cursor-not-allowed "
                    : "bg-black text-white w-full h-15 rounded-xl text-xl cursor-pointer"
                }
                disabled={isAlreadyInCart()}
                onClick={handleAddToCart}
              >
                {updatePending ? "..." : "Add to Cart"}
              </button>

              {isSuccessMessage && (
                <p className="text-xl text-green-700">Added successfully !</p>
              )}
              {updateError && (
                <p className="text-xl text-red-700">{updateError.message}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
