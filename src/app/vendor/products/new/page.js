"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createVendorProduct } from "@/lib/api/vendor";

const CATEGORIES = ["rings", "necklaces", "earrings", "bracelets"];

const initialForm = {
  productName: "",
  productDescription: "",
  price: "",
  discountPrice: "",
  category: CATEGORIES[0],
  stockQuantity: "",
  productImageUrl: "",
};

export default function NewProductPage() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      await createVendorProduct(
        {
          productName: form.productName,
          productDescription: form.productDescription,
          price: Number(form.price),
          discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
          category: form.category,
          stockQuantity: Number(form.stockQuantity),
          // simple comma-separated URLs for now — swap for real upload later
          productImageUrl: form.productImageUrl
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean),
        },
        accessToken
      );
      router.push("/vendor/products");
    } catch (err) {
      setError(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900">Add product</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Product name
          </label>
          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="e.g. Kundan Bridal Choker Set"
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
            placeholder="Materials, craftsmanship, sizing..."
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
              placeholder="8500"
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
              placeholder="5"
              className="w-full h-11 rounded-lg border border-gray-300 px-3.5 text-sm focus:outline-none focus:border-amber-700"
            />
          </div>
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
          <p className="text-xs text-gray-400 mt-1">
            Paste hosted image URLs separated by commas — file upload can come later.
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 px-6 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Adding..." : "Add product"}
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