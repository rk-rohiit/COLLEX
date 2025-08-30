import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Star,
  Flag,
} from "lucide-react";
import { useListings } from "../../context/ListingsContext";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

export function ListingDetailPage({ listingId }) {
  const { listings } = useListings();
  const { createChat } = useChat();
  const { userProfile } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!listingId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Listing not found</p>
      </div>
    );
  }

  const listing = listings.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Listing not found</p>
      </div>
    );
  }

  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();
  const isOwner = listing.ownerId === (userProfile && userProfile.id);

  const handleStartChat = async () => {
    if (!userProfile || isOwner) return;
    try {
      await createChat(listing.id, listing.ownerId);
      window.navigateTo?.("/chat");
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => window.navigateTo?.("/listings")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Listings</span>
        </button>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-video bg-gray-100">
              <img
                src={listing.images[selectedImageIndex] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {isBoosted && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⚡ Boosted
                </div>
              )}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {listing.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {listing.images.length > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription
                  ? listing.description
                  : `${listing.description.substring(0, 200)}${
                      listing.description.length > 200 ? "..." : ""
                    }`}
              </p>
              {listing.description.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-700 font-medium mt-2"
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              )}
            </div>

            {/* Tags */}
            {listing.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price & Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(listing.price)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    listing.type === "sell"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  For {listing.type === "sell" ? "Sale" : "Rent"}
                </span>
              </div>
              {listing.type === "rent" && listing.rentTerms && (
                <div className="text-sm text-gray-600">
                  <p>Per {listing.rentTerms.period}</p>
                  {listing.rentTerms.deposit > 0 && (
                    <p>
                      Security Deposit: {formatPrice(listing.rentTerms.deposit)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!isOwner ? (
              <div className="space-y-3">
                <button
                  onClick={handleStartChat}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </button>

                {listing.contactPreference === "phone" && (
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Seller</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm font-medium">
                  This is your listing
                </p>
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Item Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900">
                  {listing.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Condition</span>
                <span className="font-medium text-gray-900">
                  {listing.condition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium ${
                    listing.status === "active"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {listing.status}
                </span>
              </div>
              {listing.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900">
                    {listing.location}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Listed</span>
                <span className="font-medium text-gray-900">
                  {timeAgo(listing.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seller Information
            </h3>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {listing.ownerName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {listing.ownerName}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Verified Student</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-yellow-600 mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span>4.8 (23 reviews)</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Member since Jan 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>LPU Campus</span>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">
              💡 Safety Tips
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Meet in public campus areas</li>
              <li>• Check item condition before payment</li>
              <li>• Use campus-verified payment methods</li>
              <li>• Report suspicious activity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Items */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings
            .filter(
              (l) => l.category === listing.category && l.id !== listing.id
            )
            .slice(0, 4)
            .map((similarListing) => (
              <div
                key={similarListing.id}
                onClick={() =>
                  window.navigateTo?.("/listing", similarListing.id)
                }
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={similarListing.images[0]}
                    alt={similarListing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {similarListing.title}
                  </h4>
                  <p className="text-lg font-bold text-blue-600">
                    {formatPrice(similarListing.price)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
