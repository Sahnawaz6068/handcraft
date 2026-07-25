"use client";
import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import SearchBar from "@/components/products/SearchBar";
import { RESPONSE_DATA } from "../../lib/mockData";
import { PRICE_MIN, PRICE_MAX } from "@/lib/constants";

const Page = () => {
  const products = RESPONSE_DATA.products;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setInStockOnly(false);
    setSearch("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[1] !== PRICE_MAX ||
    inStockOnly ||
    search !== "";

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);

    const effectivePrice = p.discountPrice ?? p.price;
    const matchesPrice =
      effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];

    const matchesStock = !inStockOnly || p.stockQuantity > 0;

    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      p.productName.toLowerCase().includes(q) ||
      p.productDescription.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesPrice && matchesStock && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="mx-auto max-w-7xl relative ">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className=" text-3xl font-bold text-gray-900">
            Handcrafted <span className="text-amber-700">Jewelry</span>
          </h1>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <FilterSidebar
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;