import React, { useState } from "react";
import { ListingCard } from "../listings/ListingCard";
import { SearchFilters } from "../listings/SearchFilters";
import { useListings } from "../../context/ListingsContext";
import { Filter, Grid, List } from "lucide-react";

export function ListingsPage() {
  const { getFilteredListings, loading } = useListings();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = getFilteredListings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
          <p className="text-gray-600 mt-1">
            {filteredListings.length} items available on campus
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:w-64 flex-shrink-0`}
        >
          <SearchFilters />
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📦</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters or browse different
                categories.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
