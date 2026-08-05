"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import SearchBar from "@/components/products/SearchBar";
import { PRICE_MIN, PRICE_MAX } from "@/lib/api/constants";
import { getProducts } from "@/lib/api/product";

const LIMIT = 5; 

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search so we don't fire a request on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(LIMIT),
        });
        if (debouncedSearch) params.set("search", debouncedSearch);

        const data = await getProducts(`?${params.toString()}`);
        // data = { products, pagination } directly

        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
    return () => {
      ignore = true;
    };
  }, [page, debouncedSearch]);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
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

  // NOTE: these still filter only the CURRENT page's products client-side.
  // Category/price/stock aren't sent to the API yet — see note below.
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    const effectivePrice = p.discountPrice ?? p.price;
    const matchesPrice =
      effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];

    const matchesStock = !inStockOnly || p.stockQuantity > 0;

    return matchesCategory && matchesPrice && matchesStock;
  });

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

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

          <div>
            {loading ? (
              <div className="py-20 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-20 text-center text-gray-500">
                    No products found.
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page <= 1}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => goToPage(p)}
                          className={`rounded-md px-3 py-1.5 text-sm border ${
                            p === page
                              ? "bg-amber-700 text-white border-amber-700"
                              : "border-gray-300 text-gray-700 hover:bg-amber-50"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page >= totalPages}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50"
                    >
                      Next
                    </button>
                  </div>
                )}

                <p className="mt-3 text-center text-xs text-gray-400">
                  {totalItems} items · Page {page} of {totalPages}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
