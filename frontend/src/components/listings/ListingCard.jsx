import React, { useState } from "react";
import { Heart, MapPin, Clock, Zap, MessageCircle } from "lucide-react";

export function ListingCard({ listing, viewMode }) {
  const [isLiked, setIsLiked] = useState(false);
  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleViewListing = () => {
    window.navigateTo?.("/listing", listing.id);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={handleViewListing}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            {isBoosted && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full">
                <Zap className="w-3 h-3" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {listing.description}
                </p>

                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    {formatPrice(listing.price)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.type === "sell"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {listing.type === "sell" ? "Sale" : "Rent"}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {listing.condition}
                  </span>
                </div>
              </div>

              <button
                onClick={handleToggleLike}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location || "Campus"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeAgo(listing.createdAt)}</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">{listing.ownerName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleViewListing}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="relative aspect-square bg-gray-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {isBoosted && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Boosted</span>
            </div>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              listing.type === "sell"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {listing.type === "sell" ? "Sale" : "Rent"}
          </span>
        </div>

        <button
          onClick={handleToggleLike}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
            {listing.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {listing.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(listing.price)}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {listing.condition}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{listing.location || "Campus"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(listing.createdAt)}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {listing.ownerName.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {listing.ownerName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
