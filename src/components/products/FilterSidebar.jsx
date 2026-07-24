import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRICE_MIN, PRICE_MAX } from "@/lib/constants";

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

export default FilterSidebar;