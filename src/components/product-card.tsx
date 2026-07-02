import { NavLink } from "react-router";
import type { Product } from "../schema/product.schema";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col w-120 h-130 gap-6 shadow-xl rounded-xl transition hover:scale-105">
      <div className="w-[50%] h-[50%]">
        <img
          src={product.image}
          alt={`${product.title} image`}
          className="object-scale-down w-full h-full"
        />
      </div>

      <div>
        <p>{product.title}</p>
        <p>{product.price}</p>
        <p>{product.category}</p>
        <p className="line-clamp-2">{product.description}</p>
      </div>

      <NavLink
        to={`/products/${product.id}`}
        className="bg-amber-300 text-white w-60 flex items-center justify-center rounded-xl"
      >
        See the product
      </NavLink>
    </div>
  );
}
