import ProductCard from "../components/product-card";
import { useProducts } from "../queries/product.queries";

export default function ProductsPage() {
  const { data, error, isPending } = useProducts();

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
    <section className="flex flex-col gap-10 mt-20 items-center justify-center">
      <h1 className="text-2xl font-bold">All products</h1>

      <div className="grid grid-cols-3 gap-10">
        {data &&
          data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
