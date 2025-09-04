import React, { useState } from "react";
import { Heart, MapPin, Clock, Zap, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ListingCard({ listing, viewMode = "grid" }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays < 7 ? `${diffInDays}d ago` : date.toLocaleDateString();
  };

  const handleViewListing = () => navigate(`/listing/${listing.id}`);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleMessageSeller = (e) => {
    e.stopPropagation();
    alert(`Start chat with ${listing.ownerName}`);
  };

  /*** LIST VIEW ***/
  if (viewMode === "list") {
    return (
      <div
        onClick={handleViewListing}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          {/* Image */}
          <div className="relative flex-shrink-0">
            <img
              src={listing.images?.[0] || "/placeholder.jpg"}
              alt={listing.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            {isBoosted && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full">
                <Zap className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
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

            {/* Footer */}
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

  /*** GRID VIEW ***/
  return (
    <div
      onClick={handleViewListing}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={listing.images?.[0] || "/placeholder.jpg"}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
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

        {/* Wishlist */}
        <button
          onClick={handleToggleLike}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        {/* Chat Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleMessageSeller}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {listing.title}
        </h3>
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
