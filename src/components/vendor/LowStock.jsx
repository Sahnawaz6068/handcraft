import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function LowStock({ products = [] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Low stock</h2>
        <Link
          href="/vendor/products"
          className="text-xs text-amber-700 hover:text-amber-800"
        >
          View all
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-400">Nothing running low right now.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-700 truncate">
                {product.productName}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-700 font-medium">
                <AlertTriangle className="h-3 w-3" />
                {product.stockQuantity} left
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}