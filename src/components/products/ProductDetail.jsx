"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck, Gem } from "lucide-react";
import { addCartItem } from "@/lib/api/cart";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function ProductDetail({ product }) {
  const { accessToken } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const productId = product._id;

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;
  const inStock = product.stockQuantity > 0;
  const images = product.productImageUrl?.length
    ? product.productImageUrl
    : [null];

  const handleAddCartItem = async (quantity) => {
    try {
      await addCartItem(productId, quantity, accessToken);
      toast.success("Product added to cart")
    } catch (err) {
      console.log("failed to add to the cart");
    }
  };

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ---------------- Gallery ---------------- */}
        <div>
          <div className="aspect-square rounded-2xl bg-stone-100 flex items-center justify-center overflow-hidden">
            {images[activeImage] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[activeImage]}
                alt={product.productName}
                className="h-full w-full object-cover"
              />
            ) : (
              <Gem className="h-12 w-12 text-amber-700/40" strokeWidth={1.25} />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden border-2 transition-colors ${
                    activeImage === i
                      ? "border-amber-700"
                      : "border-transparent"
                  }`}
                >
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Gem className="h-5 w-5 text-amber-700/40" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Info ---------------- */}
        <div>
          <p className="text-sm font-medium text-amber-700 capitalize mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.productName}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-sm text-gray-900 font-medium">
                {product.rating > 0 ? product.rating.toFixed(1) : "New"}
              </span>
            </div>
            {product.numReviews > 0 && (
              <span className="text-sm text-gray-500">
                ({product.numReviews} reviews)
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <p className="text-3xl font-bold text-gray-900">
              ₹
              {(hasDiscount
                ? product.discountPrice
                : product.price
              ).toLocaleString("en-IN")}
            </p>
            {hasDiscount && (
              <>
                <p className="text-lg text-gray-400 line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <span className="text-xs font-medium bg-amber-700 text-white rounded-full px-2.5 py-1">
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.productDescription}
          </p>

          <hr className="my-8 border-gray-200" />

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:text-amber-700"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:text-amber-700"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stockQuantity, q + 1))
                }
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => handleAddCartItem(quantity)}
              disabled={!inStock}
              className="flex-1 h-11 rounded-full border border-amber-700 text-amber-700 text-sm font-medium hover:bg-amber-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {inStock ? "Add to cart" : "Out of stock"}
            </button>
            <button className="h-11 w-11 flex items-center justify-center rounded-full border border-gray-300 hover:border-amber-700 hover:text-amber-700 transition-colors">
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <button onClick={()=>{}}
            disabled={!inStock}
            className="w-full mt-3 h-11 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {inStock ? "Buy now" : "Out of stock"}
          </button>

          <p className="text-xs text-gray-500 mt-3">
            {inStock
              ? `Only ${product.stockQuantity} left in stock`
              : "Currently unavailable"}
          </p>

          <hr className="my-6 border-gray-200" />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-amber-700" />
            Ships direct from the maker, insured in transit.
          </div>
        </div>
      </div>
    </section>
  );
}
