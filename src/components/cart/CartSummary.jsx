"use client";

export default function CartSummary({ items, totalAmount }) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-2xl border border-gray-200 p-6 h-fit sticky top-24">
      <h2 className="text-lg font-bold text-gray-900">Order summary</h2>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Items ({itemCount})</span>
          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between text-base font-semibold text-gray-900">
        <span>Total</span>
        <span>₹{totalAmount.toLocaleString("en-IN")}</span>
      </div>

      <button className="w-full mt-6 h-11 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors">
        Proceed to checkout
      </button>
    </div>
  );
}