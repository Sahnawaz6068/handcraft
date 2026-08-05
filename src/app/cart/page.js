"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useAuth } from "@/context/AuthContext";

import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/api/cart";
import toast from "react-hot-toast";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, user: authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!accessToken || !authUser)) {
      router.replace("/signin");
    }
  }, [loading, accessToken, authUser, router]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchCart = async () => {
      try {
        const res = await getCart(accessToken);
        setItems(res.items ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [accessToken]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0,
  );

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const res = await updateCartItem(productId, quantity, accessToken);
      setItems(res.items);
      toast.success("Quntity changed");
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await removeCartItem(productId, accessToken);
      setItems(res.items);
      toast.success("Item Removed");
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleClear = async () => {
    try {
      const res = await clearCart(accessToken);
      setItems(res.items);
      toast.success("The cart is Empty now");
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
        <div className="mx-auto max-w-5xl text-center py-24">
          <ShoppingBag
            className="h-10 w-10 text-amber-700/40 mx-auto mb-4"
            strokeWidth={1.25}
          />
          <h1 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mt-2">
            Nothing here yet — go find something handmade.
          </p>
          <button className="mt-6 h-11 px-6 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors">
            Browse products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <CartSummary items={items} totalAmount={totalAmount} />
        </div>
      </div>
    </section>
  );
}
