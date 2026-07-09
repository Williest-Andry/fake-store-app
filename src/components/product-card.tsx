import { NavLink } from "react-router";
import type { Product } from "../schema/product.schema";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <NavLink
      to={`/products/${product.id}`}
      className="flex flex-col items-start w-90 sm:w-120 h-140 gap-2 shadow-xl border border-gray-300 transition hover:scale-105 font-work"
    >
      <div className="flex w-full items-center justify-center h-[80%] px-2 bg-gray-100">
        <img
          src={product.image}
          alt={`${product.title} image`}
          className="object-scale-down w-60"
        />
      </div>

      <div className="flex flex-col pl-2">
        <p className="font-bold line-clamp-1">{product.title}</p>
        <p>{product.category}</p>
        <p className="font-bold">{product.price}</p>
      </div>
    </NavLink>
  );
}
