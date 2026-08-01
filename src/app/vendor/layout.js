"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  const { accessToken, user: authUser, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // close the drawer automatically whenever the route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // still restoring auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // not signed in at all
  if (!accessToken || !authUser) {
    router.replace("/signin");
    return null;
  }

  const hasApplied = Boolean(authUser.vendorProfile?.shopName);

  // never applied for vendor — send them to apply
  if (!hasApplied) {
    router.replace("/become-seller");
    return null;
  }

  // applied, but not approved yet — show a holding screen, no sidebar/dashboard
  if (!authUser.vendorProfile?.isApproved) {
    return (
      <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Application pending
          </h1>
          <p className="text-gray-500 mt-2">
            Your seller application is still under review. We'll notify you
            once it's approved.
          </p>
        </div>
      </section>
    );
  }

  // approved vendor — render the actual dashboard shell
  return (
    <div className="min-h-screen mt-20 bg-[#faf7f2] flex">
      {/* backdrop — only rendered/visible on mobile when the drawer is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-200 bg-white px-4 py-8 transform transition-transform duration-200 md:translate-x-0 ${
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
        <nav className="space-y-1 mt-10">
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

      <div className="flex-1 flex flex-col min-w-0">
        {/* hamburger bar — only visible on mobile */}
        <div className="md:hidden flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
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
          <div className="w-5" /> {/* spacer to keep the title centered */}
        </div>

        <main className="flex-1 px-4 sm:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}