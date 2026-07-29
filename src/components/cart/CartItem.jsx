"use client";

import { Minus, Plus, Trash2, Gem } from "lucide-react";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const lineTotal = item.priceAtAdd * item.quantity;

  return (
    <div className="flex items-center gap-4 py-5 border-b border-gray-200">
      <div className="h-20 w-20 rounded-xl bg-stone-100 flex items-center justify-center overflow-hidden shrink-0">
        <Gem className="h-6 w-6 text-amber-700/40" strokeWidth={1.25} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          Product #{item.productId.slice(-6)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          ₹{item.priceAtAdd.toLocaleString("en-IN")} each
        </p>
      </div>

      <div className="flex items-center border border-gray-300 rounded-full">
        <button
          className="h-8 w-8 flex items-center justify-center text-gray-600 hover:text-amber-700"
          onClick={() => onQuantityChange(item.productId, Math.max(1, item.quantity - 1))}
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <button
          className="h-8 w-8 flex items-center justify-center text-gray-600 hover:text-amber-700"
          onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <p className="w-24 text-right text-sm font-semibold text-gray-900">
        ₹{lineTotal.toLocaleString("en-IN")}
      </p>

      <button
        className="text-gray-400 hover:text-red-600 transition-colors"
        onClick={() => onRemove(item.productId)}
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}