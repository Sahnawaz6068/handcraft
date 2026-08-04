"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
} from "@/lib/api/vendor";

const CATEGORIES = ["rings", "necklaces", "earrings", "bracelets"];
const STATUSES = ["draft", "active", "out_of_stock", "archived"];

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { accessToken } = useAuth();

  const [form, setForm] = useState(null); // null until product loads
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken || !id) return;

    const fetchProduct = async () => {
      try {
        const product = await getVendorProduct(id, accessToken);
        setForm({
          productName: product.productName ?? "",
          productDescription: product.productDescription ?? "",
          price: product.price ?? "",
          discountPrice: product.discountPrice ?? "",
          category: product.category ?? CATEGORIES[0],
          stockQuantity: product.stockQuantity ?? "",
          status: product.status ?? "draft",
          productImageUrl: (product.productImageUrl ?? []).join(", "),
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [accessToken, id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.productName.trim() || !form.price || !form.stockQuantity) {
      setError("Product name, price, and stock quantity are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateVendorProduct(
        id,
        {
          productName: form.productName,
          productDescription: form.productDescription,
          price: Number(form.price),
          discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
          category: form.category,
          stockQuantity: Number(form.stockQuantity),
          status: form.status,
          productImageUrl: form.productImageUrl
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean),
        },
        accessToken
      );
      router.push("/vendor/products");
    } catch (err) {
      setError(err.message || "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product? This can't be undone.")) return;

    setIsDeleting(true);
    try {
      await deleteVendorProduct(id, accessToken);
      router.push("/vendor/products");
    } catch (err) {
      setError(err.message || "Failed to delete product");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-xl animate-pulse space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!form) {
    return <p className="text-gray-600">Couldn't load this product.</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Edit product</h1>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-40"
        >
          {isDeleting ? "Deleting..." : "Delete product"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product name
          </label>
          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            name="productDescription"
            value={form.productDescription}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-700 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Price (₹)
            </label>
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Discount price (₹)
            </label>
            <input
              name="discountPrice"
              type="number"
              min="0"
              value={form.discountPrice}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700 capitalize"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Stock quantity
            </label>
            <input
              name="stockQuantity"
              type="number"
              min="0"
              value={form.stockQuantity}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700 capitalize"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Only "active" products are visible to customers.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Image URLs
          </label>
          <input
            name="productImageUrl"
            value={form.productImageUrl}
            onChange={handleChange}
            placeholder="https://... (comma-separated for multiple)"
            className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 px-6 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/vendor/products")}
            className="h-11 px-6 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}