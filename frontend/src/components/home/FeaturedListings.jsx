import React from "react";
import { Zap } from "lucide-react";
import { useListings } from "../../context/ListingsContext";
import { ListingCard } from "../listings/ListingCard";

const FeaturedListings = () => {
  const { listings } = useListings();

  // Get boosted and recent listings
  const boostedListings = listings.filter(
    (listing) =>
      listing.boostedUntil && new Date(listing.boostedUntil) > new Date()
  );

  const recentListings = listings
    .filter((listing) => listing.status === "active")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Boosted Listings */}
      {boostedListings.length > 0 && (
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Boosted Listings
              </h2>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Promoted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boostedListings.slice(0, 3).map((listing) => (
              <ListingCard key={listing.id} listing={listing} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Latest Listings</h2>
          <button
            onClick={() => window.navigateTo?.("/listings")}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} viewMode="grid" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
