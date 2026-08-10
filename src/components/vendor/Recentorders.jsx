"use client"

import Link from "next/link";

export default function RecentOrders({ orders = [] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Recent orders</h2>
        <Link
          href="/vendor/orders"
          className="text-xs text-amber-700 hover:text-amber-800"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-400">No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order._id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600">#{order._id.slice(-6)}</span>
              <span className="text-gray-900 font-medium">
                ₹{order.totalAmount?.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}