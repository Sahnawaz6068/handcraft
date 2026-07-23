import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const FilterSidebar = ({
  selectedCategories,
  toggleCategory,
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
  </div>
);

export default FilterSidebar;