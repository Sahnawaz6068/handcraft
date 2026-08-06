"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getProfile } from "@/lib/api/auth";

const NAV_ITEMS = [
  { href: "/vendor", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/vendor/products", label: "Products", icon: Package },
  { href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
];

function NavLink({ href, label, icon: Icon, exact, pathname, onNavigate }) {
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-amber-700 text-white"
          : "text-gray-600 hover:bg-stone-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export default function VendorLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, user: authUser, loading,updateUser } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hasApplied = !!authUser?.vendorProfile?.shopName;
  

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    async function onLoad() {
      if (loading) return;

      const user = await getProfile(authUser._id, accessToken);
      updateUser(user);

      if (!accessToken || !authUser) {
        router.replace("/signin");
        return;
      }

      if (!hasApplied) {
        router.replace("/apply");
      }
    }
    onLoad();
  }, [loading, accessToken, authUser, hasApplied, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!accessToken || !authUser || !hasApplied) {
    return null;
  }

  if (!authUser.vendorProfile?.isApproved) {
    return (
      <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Application Pending
          </h1>

          <p className="mt-2 text-gray-500">
            Your seller application is currently under review. We'll notify you
            once it's approved.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex mt-10">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-200 bg-white px-4 py-8 transform transition-transform duration-200 md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            {authUser.vendorProfile.shopName}
          </p>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              pathname={pathname}
              onNavigate={() => setIsSidebarOpen(false)}
            />
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 min-w-0 flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <p className="text-sm font-medium text-gray-900">
            {authUser.vendorProfile.shopName}
          </p>

          <div className="w-5" />
        </div>

        <main className="flex-1 px-4 py-10 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
