"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Collections", href: "/category" },
  { label: "Vendors", href: "/vendors" },
  { label: "Journal", href: "/journal" },
];

const HALLMARKS = [
  "925 SILVER",
  "18K GOLD",
  "BIS HALLMARKED",
  "HANDCRAFTED",
  "LIFETIME AUTHENTICITY",
  "INSURED SHIPPING",
];

export default function Navbar({ showHallmarkStrip = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-[#12100E]/95 backdrop-blur-md border-b border-[#C9A961]/15"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Gem className="h-5 w-5 text-[#C9A961]" strokeWidth={1.5} />
          <span
            className="text-xl italic tracking-tight text-[#F5F1E8]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Orna
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#F5F1E8]/80 hover:text-[#C9A961] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A961] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#F5F1E8] hover:text-[#C9A961] hover:bg-white/5"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-[#F5F1E8] hover:text-[#C9A961] hover:bg-white/5 hidden sm:inline-flex"
            aria-label="Wishlist"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A961] text-[10px] font-medium text-[#12100E]">
                {wishlistCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-[#F5F1E8] hover:text-[#C9A961] hover:bg-white/5"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A961] text-[10px] font-medium text-[#12100E]">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            className="hidden md:inline-flex ml-2 border-[#C9A961]/40 text-[#F5F1E8] hover:bg-[#C9A961] hover:text-[#12100E] hover:border-[#C9A961]"
            asChild
          >
            <Link href="/signin">Sign in</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[#F5F1E8] hover:bg-white/5"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#12100E] border-[#C9A961]/15 text-[#F5F1E8]">
              <nav className="mt-10 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-[#F5F1E8]/90 hover:text-[#C9A961]"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/signin" className="text-lg text-[#C9A961]">
                    Sign in
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Hallmark trust strip */}
      {showHallmarkStrip && (
        <div className="overflow-hidden border-t border-[#C9A961]/10 bg-[#0E0C0A]">
          <div className="flex whitespace-nowrap animate-marquee py-1.5 motion-reduce:animate-none">
            {[...HALLMARKS, ...HALLMARKS].map((mark, i) => (
              <span
                key={i}
                className="mx-4 text-[10px] tracking-[0.15em] text-[#8A8478]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {mark}
                <span className="mx-4 text-[#C9A961]/40">·</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}