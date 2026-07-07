import { useEffect } from "react";
import ErrorSection from "../components/error-section";
import Loading from "../components/loading";
import ProductCard from "../components/product-card";
import { useProducts } from "../queries/product.queries";
import { useProductStore } from "../store/product.store";

export default function ProductsPage() {
  const { data, error, isPending } = useProducts();

  const { products, addProducts } = useProductStore();

  useEffect(() => {
    if (data)
      data.map((p) => {
        if (products.find((product) => product.id == p.id)) return;
        else addProducts([p]);
      });
  }, [data]);

  if (error) return <ErrorSection />;

  if (isPending) return <Loading />;

  return (
    <section className="font-work flex flex-col gap-10 mt-20 items-center justify-center">
      <h1 className="text-3xl font-bold">All products</h1>

      <div className="grid grid-cols-1 lg:min-[1555px]:grid-cols-3 gap-10">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
