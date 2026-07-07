import type { Product } from "../schema/product.schema";
import { useCartStore } from "../store/cart.store";
import Badge from "./badge";

type ProductCartProps = {
  product: Product;
};

export default function ProductCart({ product }: ProductCartProps) {
  const { products, setProducts } = useCartStore();

  const handleDelete = () => {
    const remainProducts = products.filter((p) => p.id != product.id);
    setProducts(remainProducts);
  };

  return (
    <div className="flex items-center w-400 h-100 gap-6 shadow-xl rounded-xl transition hover:scale-105">
      <div className="flex w-[50%] items-center justify-center h-full px-2 bg-gray-100">
        <img
          src={product.image}
          alt={`${product.title} image`}
          className="object-scale-down w-60"
        />
      </div>

      <div className="flex flex-col pl-2 gap-10 w-[50%]">
        <p className="font-bold text-2xl">{product.title}</p>
        <Badge value={product.category} w="50" />
        <p className="font-bold">{product.price}</p>

        <button
          className="bg-red-500 text-white text-xl w-50 rounded-xl h-10 cursor-pointer hover:bg-white hover:text-red-500 hover:border hover:border-red-500 "
          onClick={handleDelete}
        >
          Delete to cart
        </button>
      </div>
    </div>
  );
}
