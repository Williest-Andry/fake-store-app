import { useParams } from "react-router";
import { useProduct } from "../queries/product.queries";
import Navbar from "../components/navbar";
import { useCartStore } from "../store/cart.store";

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

      <section className="flex flex-col gap-50 mt-30 justify-between items-center">
        <div className="flex justify-between">
          <div>
            <img src={product.image} alt={`${product.title} image`} />
          </div>

          <div className="flex flex-col gap-20">
            <div>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
              <p>{product.description}</p>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <button
                className={
                  products.indexOf(product) === -1
                    ? "bg-blue-500 text-white w-50 h-20 rounded-xl text-xl"
                    : "bg-blue-500 text-white w-50 h-20 rounded-xl text-xl opacity-50"
                }
                onClick={handleAddToCart}
                disabled={isAlreadyInCart()}
              >
                Add to cart
              </button>
              {isAlreadyInCart() && (
                <p className="text-sm text-red-600">
                  Already exists in your cart
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
