import React, { useState } from "react";
import { Sliders } from "lucide-react";
import { useListings } from "../../context/ListingsContext";

const categories = [
  "All",
  "Books",
  "Electronics",
  "Vehicles",
  "Furniture",
  "Clothing",
  "Sports",
  "Stationery",
  "Appliances",
  "Other",
];

const conditions = [
  { value: "all", label: "All Conditions" },
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "boosted", label: "Boosted First" },
];

export function SearchFilters() {
  const {
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
  } = useListings();

  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [listingType, setListingType] = useState("all");

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...tempPriceRange];
    newRange[index] = parseInt(value) || 0;
    setTempPriceRange(newRange);
    setPriceRange(newRange);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange([0, 100000]);
    setTempPriceRange([0, 100000]);
    setSortBy("recent");
    setSelectedCondition("all");
    setListingType("all");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range (₹)
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  value={tempPriceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  value={tempPriceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  placeholder="100000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Price Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Under ₹500", range: [0, 500] },
                { label: "₹500-₹2000", range: [500, 2000] },
                { label: "₹2000-₹10000", range: [2000, 10000] },
                { label: "Above ₹10000", range: [10000, 100000] },
              ].map((quickFilter) => (
                <button
                  key={quickFilter.label}
                  onClick={() => {
                    setTempPriceRange(quickFilter.range);
                    setPriceRange(quickFilter.range);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  {quickFilter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Condition
          </label>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <button
                key={condition.value}
                onClick={() => setSelectedCondition(condition.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCondition === condition.value
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {condition.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listing Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type
          </label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Types" },
              { value: "sell", label: "For Sale" },
              { value: "rent", label: "For Rent" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setListingType(type.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  listingType === type.value
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
