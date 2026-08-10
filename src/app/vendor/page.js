"use client";

import { useEffect, useState } from "react";
import { Package, ShoppingBag, IndianRupee, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getVendorDashboard } from "@/lib/api/vendor";
import StatCard from "@/components/vendor/Statcard";
import RecentOrders from "@/components/vendor/Recentorders";
import LowStock from "@/components/vendor/LowStock";

export default function VendorDashboardPage() {
  const { accessToken, loading } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading || !accessToken) return;

    const fetchStats = async () => {
      try {
        const res = await getVendorDashboard(accessToken);
        setStats(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [accessToken, loading]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-gray-600">
        Couldn't load dashboard stats. Try refreshing the page.
      </p>
    );
  }

  const {
    totalProducts = 0,
    totalOrders = 0,
    totalRevenue = 0,
    pendingOrders = 0,
    recentOrders = [],
    lowStockProducts = [],
  } = stats ?? {};

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard icon={Package} label="Total products" value={totalProducts} />
        <StatCard icon={ShoppingBag} label="Total orders" value={totalOrders} />
        <StatCard
          icon={IndianRupee}
          label="Total revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
        />
        <StatCard icon={Clock} label="Pending orders" value={pendingOrders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentOrders orders={recentOrders} />
        <LowStock products={lowStockProducts} />
      </div>
    </div>
  );
}