"use client";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  Zap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";

const DEFAULT_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Cart", href: "/cart" },
  { label: "Order", href: "/orders" },
];

const MEGA_MENU_SECTIONS = [
  {
    icon: Layers,
    title: "Platform",
    items: [
      { label: "Overview", href: "#platform-overview" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    icon: Zap,
    title: "Automate",
    items: [
      { label: "Workflows", href: "#workflows" },
      { label: "Triggers", href: "#triggers" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    items: [
      { label: "Security", href: "#security" },
      { label: "Compliance", href: "#compliance" },
    ],
  },
  {
    icon: BarChart3,
    title: "Insights",
    items: [
      { label: "Analytics", href: "#analytics" },
      { label: "Reporting", href: "#reporting" },
    ],
  },
];

const Navbar = ({
  logoText = "HandCraft",
  links = DEFAULT_LINKS,
  onSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLabel, setActiveLabel] = useState(links[0]?.label);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const megaRef = useRef(null);
  const { user, isLoading } = useAuth();

  // Sticky background transition on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);



  const theme = dark
    ? {
        bar: scrolled
          ? "bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-xl shadow-black/30"
          : "bg-slate-900/40 backdrop-blur-lg border-white/10 shadow-lg shadow-black/20",
        text: "text-slate-200",
        textMuted: "text-slate-400",
        hover: "hover:text-white",
        panel: "bg-slate-900/80 backdrop-blur-xl border-white/10",
        input: "bg-white/10 text-slate-100 placeholder-slate-400",
        cta: "bg-indigo-500 hover:bg-indigo-400 text-white",
        iconBtn: "hover:bg-white/10 text-slate-300",
      }
    : {
        bar: scrolled
          ? "bg-white/60 backdrop-blur-xl border-white/40 shadow-xl shadow-slate-900/10"
          : "bg-white/40 backdrop-blur-lg border-white/40 shadow-lg shadow-slate-900/5",
        text: "text-slate-700",
        textMuted: "text-slate-500",
        hover: "hover:text-slate-950",
        panel: "bg-white/80 backdrop-blur-xl border-white/60",
        input: "bg-black/5 text-slate-900 placeholder-slate-400",
        cta: "bg-indigo-600 hover:bg-indigo-500 text-white",
        iconBtn: "hover:bg-black/5 text-slate-600",
      };

  const handleNavClick = (link) => {
    setActiveLabel(link.label);
    if (!link.megaMenu) setMegaOpen(false);
  };



  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <header
        className={`w-full max-w-4xl rounded-full border transition-all duration-300 ${theme.bar}`}
      >
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg font-semibold tracking-tight ${
              dark ? "text-white" : "text-slate-950"
            }`}
          >
            {logoText}
          </Link>

          {/* Desktop nav */}
          <nav className="relative hidden md:block" ref={megaRef}>
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.label} className="relative">
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    onMouseEnter={() => link.megaMenu && setMegaOpen(true)}
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${theme.text} ${theme.hover}`}
                  >
                    {link.label}
                    {link.megaMenu && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {/* Active underline */}
                  <span
                    className={`pointer-events-none absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-indigo-500 transition-transform duration-300 ${
                      activeLabel === link.label ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </li>
              ))}
            </ul>

            {/* Mega dropdown */}
            <div
              onMouseLeave={() => setMegaOpen(false)}
              className={`absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 rounded-2xl border p-6 shadow-2xl transition-all duration-200 ${
                theme.panel
              } ${
                megaOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                {MEGA_MENU_SECTIONS.map(({ icon: Icon, title, items }) => (
                  <div key={title}>
                    <div
                      className={`mb-2 flex items-center gap-2 text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}
                    >
                      <Icon size={16} className="text-indigo-500" />
                      {title}
                    </div>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={`block rounded px-2 py-1 text-sm ${theme.textMuted} ${theme.hover}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2">
          
            {!isLoading &&
              (user ? (
                <Link
                  href="/profile"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-block text-white bg-amber-600"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-block text-white bg-amber-600"
                >
                  Get Started
                </Link>
              ))}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`grid h-9 w-9 place-items-center rounded-full md:hidden ${theme.iconBtn}`}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-72 border-l p-5 transition-transform duration-300 ${
              theme.panel
            } ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="mb-6 flex items-center justify-between">
              <span
                className={`text-base font-semibold ${dark ? "text-white" : "text-slate-950"}`}
              >
                {logoText}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className={`grid h-8 w-8 place-items-center rounded-full ${theme.iconBtn}`}
              >
                <X size={18} />
              </button>
            </div>

            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => {
                      handleNavClick(link);
                      setMobileOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                      activeLabel === link.label
                        ? "bg-indigo-500/10 text-indigo-500"
                        : `${theme.text} ${theme.hover}`
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
