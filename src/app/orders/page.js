"use client";

import React, { useMemo, useState } from "react";
import { Search, Star, ChevronLeft, ChevronRight, X, SlidersHorizontal } from "lucide-react";

// Hardcoded response data (from your /api/v1/products response)
const RESPONSE_DATA = {
  products: [
    {
      _id: "6a4612943ce84c7148360bac",
      productName: "Kundan Bridal Choker Set",
      slug: "kundan-bridal-choker-set",
      productDescription:
        "Heavy kundan and pearl choker set with matching earrings, designed for weddings.",
      price: 8500,
      discountPrice: 6999,
      category: "necklaces",
      stockQuantity: 5,
      rating: 0,
      numReviews: 0,
      productImageUrl: [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFXxIx1YeJVZBsLYPNt4a7sJsmaOFf39CrF2KDvoGqunnoAaLFiQmF6uQUQuFtMAsaCvLHBb8T6-Ag36ziZcf8D3Pni8Yqw0QAITLZ4RkS8U-27cL335B7",
      ],
      tags: ["kundan", "bridal", "choker", "wedding"],
      status: "active",
      isFeatured: true,
      createdAt: "2026-07-02T07:26:12.912Z",
    },
    {
      _id: "6a4612863ce84c7148360bab",
      productName: "Rose Gold Solitaire Ring",
      slug: "rose-gold-solitaire-ring",
      productDescription:
        "Elegant rose gold-plated ring with cubic zirconia solitaire.",
      price: 899,
      discountPrice: null,
      category: "rings",
      stockQuantity: 40,
      rating: 0,
      numReviews: 0,
      productImageUrl: [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFXxIx1YeJVZBsLYPNt4a7sJsmaOFf39CrF2KDvoGqunnoAaLFiQmF6uQUQuFtMAsaCvLHBb8T6-Ag36ziZcf8D3Pni8Yqw0QAITLZ4RkS8U-27cL335B7",
      ],
      tags: ["rose gold", "ring", "solitaire"],
      status: "active",
      isFeatured: false,
      createdAt: "2026-07-02T07:25:58.384Z",
    },
    {
      _id: "6a4612723ce84c7148360baa",
      productName: "Silver Oxidized Jhumka Earrings",
      slug: "silver-oxidized-jhumka-earrings",
      productDescription:
        "Traditional oxidized silver jhumkas with temple-style carving, handcrafted finish.",
      price: 1200,
      discountPrice: 999,
      category: "earrings",
      stockQuantity: 25,
      rating: 0,
      numReviews: 0,
      productImageUrl: [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFXxIx1YeJVZBsLYPNt4a7sJsmaOFf39CrF2KDvoGqunnoAaLFiQmF6uQUQuFtMAsaCvLHBb8T6-Ag36ziZcf8D3Pni8Yqw0QAITLZ4RkS8U-27cL335B7",
        "https://example.com/images/jhumka-side.jpg",
      ],
      tags: ["silver", "oxidized", "earrings", "traditional"],
      status: "active",
      isFeatured: true,
      createdAt: "2026-07-02T07:25:38.499Z",
    },
    {
      _id: "6a44d1edf5c1bf738482e7f4",
      productName: "Gold Heart Necklace",
      slug: "gold-heart-necklace",
      productDescription: "18K gold plated heart necklace with premium finish.",
      price: 4999,
      discountPrice: 3999,
      category: "necklaces",
      stockQuantity: 25,
      rating: 0,
      numReviews: 0,
      productImageUrl: [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTFXxIx1YeJVZBsLYPNt4a7sJsmaOFf39CrF2KDvoGqunnoAaLFiQmF6uQUQuFtMAsaCvLHBb8T6-Ag36ziZcf8D3Pni8Yqw0QAITLZ4RkS8U-27cL335B7",
        "https://example.com/images/necklace-back.jpg",
      ],
      tags: ["gold", "heart", "women", "jewellery"],
      status: "active",
      isFeatured: true,
      createdAt: "2026-07-01T08:38:05.671Z",
    },
  ],
  pagination: {
    total: 4,
    page: 1,
    limit: 12,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

const CATEGORIES = [
  { label: "Necklaces", value: "necklaces" },
  { label: "Rings", value: "rings" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const PAGE_SIZE = 12;

const ProductCard = ({ product }) => {
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.productImageUrl?.[0]}
          alt={product.productName}
          className="h-full w-full rounded-lg object-cover transition duration-300 group-hover:scale-105"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-700 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700 shadow">
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}
            % OFF
          </span>
        )}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-900">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs capitalize text-gray-400">{product.category}</p>
        <h3 className="mt-1 truncate font-semibold text-gray-900">
          {product.productName}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating || "New"}
          {product.numReviews > 0 && <span>({product.numReviews})</span>}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹
            {(hasDiscount
              ? product.discountPrice
              : product.price
            ).toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSidebar = ({
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  inStockOnly,
  setInStockOnly,
  clearFilters,
  hasActiveFilters,
}) => (
  <div className="rounded-3xl bg-white p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 font-semibold text-gray-900">
        <SlidersHorizontal className="h-4 w-4 text-amber-700" />
        Filters
      </h2>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-xs font-medium text-amber-700 hover:text-amber-800"
        >
          Clear all
        </button>
      )}
    </div>

    {/* Category */}
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-900">Category</h3>
      <div className="mt-3 space-y-2.5">
        {CATEGORIES.map((c) => (
          <label
            key={c.value}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(c.value)}
              onChange={() => toggleCategory(c.value)}
              className="h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-700/30"
            />
            {c.label}
          </label>
        ))}
      </div>
    </div>

    {/* Price range */}
    <div className="mt-6 border-t border-gray-100 pt-6">
      <h3 className="text-sm font-semibold text-gray-900">Price range</h3>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
        <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
      </div>
      <input
        type="range"
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={100}
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], Number(e.target.value)])
        }
        className="mt-2 w-full accent-amber-700"
      />
    </div>

    {/* Stock */}
    <div className="mt-6 border-t border-gray-100 pt-6">
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-700/30"
        />
        In stock only
      </label>
    </div>
  </div>
);

const Page = () => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allProducts = RESPONSE_DATA.products;

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          p.productDescription.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => {
      const effectivePrice = p.discountPrice ?? p.price;
      return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    });

    if (inStockOnly) {
      result = result.filter((p) => p.stockQuantity > 0);
    }

    switch (sort) {
      case "price_asc":
        result.sort(
          (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
        );
        break;
      case "price_desc":
        result.sort(
          (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
        );
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "featured":
      default:
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
    }

    return result;
  }, [allProducts, search, selectedCategories, priceRange, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setInStockOnly(false);
    setSort("featured");
    setPage(1);
  };

  const hasActiveFilters =
    search ||
    selectedCategories.length > 0 ||
    priceRange[1] !== PRICE_MAX ||
    inStockOnly ||
    sort !== "featured";

  const sidebarProps = {
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    clearFilters,
    hasActiveFilters,
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf7f2] pt-10">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Handcrafted <span className="text-amber-700">Jewelry</span>
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 && "s"} found
            </p>
          </div>

          <div className="flex w-full gap-3 sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search rings, necklaces, earrings..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-10 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={handleSortChange}
              className="hidden rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-amber-700 lg:block"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Body: sidebar + grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          {/* Sidebar — mobile drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="relative ml-auto flex h-full w-80 max-w-[85%] flex-col overflow-y-auto bg-[#faf7f2] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Sort — shown here on mobile since top bar hides it */}
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="mb-4 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-amber-700"
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>

                <FilterSidebar {...sidebarProps} />

                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="mt-4 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white hover:bg-amber-800"
                >
                  Show {filteredProducts.length} results
                </button>
              </div>
            </div>
          )}

          {/* Product grid */}
          <div>
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg font-semibold text-gray-900">
                  No products found
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-amber-700 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 w-9 rounded-xl text-sm font-medium transition ${
                      currentPage === p
                        ? "bg-amber-700 text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:border-amber-700 hover:text-amber-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-amber-700 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;