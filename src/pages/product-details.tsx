import { useParams } from "react-router";
import { useProduct } from "../queries/product.queries";
import Navbar from "../components/navbar";
import { useCartStore } from "../store/cart.store";
import Badge from "../components/badge";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, error, isPending } = useProduct(id ?? "");

  const { addProduct, products } = useCartStore();

  const isAlreadyInCart = () => {
    return products.indexOf(product!) >= 0;
  };

  const handleAddToCart = () => {
    if (product && !isAlreadyInCart()) addProduct(product);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center mt-100">
        <p className="text-3xl text-red-600">{error.message}</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-100">
        <p className="text-3xl text-blue-600">Loading ...</p>
      </div>
    );
  }

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

            <div className="flex flex-col gap-4 w-80">
              <button
                className={
                  isAlreadyInCart()
                    ? "bg-black text-white w-full h-15 rounded-xl text-xl opacity-50 cursor-not-allowed "
                    : "bg-black text-white w-full h-15 rounded-xl text-xl cursor-pointer"
                }
                onClick={handleAddToCart}
                disabled={isAlreadyInCart()}
              >
                {isAlreadyInCart() ? "Already in your cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
