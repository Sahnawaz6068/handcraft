"use client";
import ProductCard from "@/components/products/ProductCard";
import { RESPONSE_DATA } from "../../lib/mockData";
import { useState } from "react";
import FilterSidebar from "@/components/products/FilterSidebar";
// import { PRICE_MIN } from "@/lib/constants";
import { PRICE_MIN, PRICE_MAX } from "@/lib/constants";

const Page = () => {
  const products = RESPONSE_DATA.products;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange[1] !== PRICE_MAX || inStockOnly;

  const filteredProducts = products.filter((p) => {
  const matchesCategory =
    selectedCategories.length === 0 || selectedCategories.includes(p.category);

  const effectivePrice = p.discountPrice ?? p.price;
  const matchesPrice =
    effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];

  const matchesStock = !inStockOnly || p.stockQuantity > 0;

  return matchesCategory && matchesPrice && matchesStock;
});

  return (
    <section className="min-h-screen bg-[#faf7f2] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Handcrafted <span className="text-amber-700">Jewelry</span>
        </h1>

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
