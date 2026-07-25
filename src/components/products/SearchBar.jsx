import { Search, X } from "lucide-react";

const SearchBar = ({ search, setSearch }) => (
  <div className="relative flex-1 sm:w-80">
    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search rings, necklaces, earrings..."
      className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-10 text-gray-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
    />

    {search && (
      <button
        onClick={() => setSearch("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label="Clear search"
      >
        <X className="h-5 w-5" />
      </button>
    )}
  </div>
);

export default SearchBar;
