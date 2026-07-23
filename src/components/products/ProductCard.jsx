import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.productImageUrl?.[0]}
          alt={product.productName}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-700 px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}

        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700 shadow">
            {discountPercentage}% OFF
          </span>
        )}

        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs capitalize text-gray-400">{product.category}</p>

        <h3 className="mt-1 truncate font-semibold text-gray-900">
          {product.productName}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating || "New"}
          {product.numReviews > 0 && <span>({product.numReviews})</span>}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹
            {(hasDiscount ? product.discountPrice : product.price).toLocaleString(
              "en-IN"
            )}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;