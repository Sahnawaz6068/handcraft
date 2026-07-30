"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { getCart } from "@/lib/api/cart";

// const MOCK_CART = {
//   _id: "6a696bf4509755894b9e819c",
//   userId: "6a65a2f377be29a0d271c178",
//   items: [
//     {
//       productId: "6a4612943ce84c7148360bac",
//       vendorId: "6863c6d4b7f3e94d7b4b1234",
//       quantity: 2,
//       priceAtAdd: 6999,
//     },
//     {
//       productId: "6a4612863ce84c7148360bab",
//       vendorId: "6863c6d4b7f3e94d7b4b1234",
//       quantity: 2,
//       priceAtAdd: 899,
//     },
//   ],
// };

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await getCart();
        setItems(res.successResponse?.data?.items??[]);

        setItems(cart.items);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCard();
  }, []);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0,
  );

  const handleQuantityChange = (productId, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemove = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClear = () => setItems([]);

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
