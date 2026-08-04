"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Gem, Trash2, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getVendorProducts, deleteVendorProduct } from "@/lib/api/vendor";

export default function VendorProductsPage() {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchProducts = async () => {
      try {
        const res = await getVendorProducts(accessToken);
        setProducts(res.products ?? res ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [accessToken]);

  const handleDelete = async (productId) => {
    if (!confirm("Delete this product? This can't be undone.")) return;

    setDeletingId(productId);
    try {
      await deleteVendorProduct(productId, accessToken);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/vendor/products/new"
          className="flex items-center gap-1.5 h-10 px-4 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add product
        </Link>
      </div>

      {isLoading && (
        <div className="mt-8 space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-8 text-gray-600">
          Couldn't load your products. Try refreshing the page.
        </p>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="mt-16 text-center">
          <Gem
            className="h-8 w-8 text-amber-700/40 mx-auto mb-3"
            strokeWidth={1.25}
          />
          <p className="text-gray-500">You haven't listed anything yet.</p>
          <Link
            href="/vendor/products/new"
            className="inline-block mt-4 text-sm text-amber-700 hover:text-amber-800 font-medium"
          >
            Add your first product
          </Link>
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden shrink-0">
                        {product.productImageUrl?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.productImageUrl[0]}
                            alt={product.productName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Gem
                            className="h-4 w-4 text-amber-700/40"
                            strokeWidth={1.25}
                          />
                        )}
                      </div>
                      <span className="text-gray-900 font-medium truncate max-w-[200px]">
                        {product.productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 capitalize">
                    {product.category}
                  </td>
                  <td className="px-5 py-4 text-gray-900">
                    ₹
                    {(product.discountPrice ?? product.price)?.toLocaleString(
                      "en-IN",
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        product.stockQuantity <= 0
                          ? "text-red-600"
                          : product.stockQuantity <= 5
                            ? "text-amber-700"
                            : "text-gray-600"
                      }
                    >
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "inactive"
                            ? "bg-gray-100 text-gray-700"
                            : product.status === "draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/vendor/products/${product._id}`}
                        className="text-gray-400 hover:text-amber-700"
                        aria-label="Edit product"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deletingId === product._id}
                        className="text-gray-400 hover:text-red-600 disabled:opacity-40"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
