import Loading from "../components/loading";
import Navbar from "../components/navbar";
import ProductCart from "../components/product-cart";
import { useCartStore } from "../store/cart.store";

export default function MyCart() {
  const { products } = useCartStore();

  if (!products) return <Loading />;

  return (
    <>
      <Navbar />

      {products && products.length > 0 ? (
        <section className="mt-20 flex flex-col gap-10 items-center justify-center">
          <p className="text-2xl font-bold">All my items</p>

          <div className="flex flex-col gap-10">
            {products.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center mt-100">
          <p className="text-3xl text-blue-600">No items in your cart</p>
        </div>
      )}
    </>
  );
}
