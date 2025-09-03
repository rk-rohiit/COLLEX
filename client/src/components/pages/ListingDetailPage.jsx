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
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export function ListingDetailPage() {
  const { listings } = useListings();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();

  // ✅ Fetch listing based on URL id
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">❌ Listing not found</p>
        <button
          onClick={() => navigate("/listings")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back to Listings
        </button>
      </div>
    );
  }

  const isBoosted =
    listing.boostedUntil && new Date(listing.boostedUntil) > new Date();
  const isOwner = listing.ownerId === userProfile?.id;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  //   const timeAgo = (dateString) => {
  //     const date = new Date(dateString);
  //     const now = new Date();
  //     const diffInHours = Math.floor(
  //       (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  //     );

  //     if (diffInHours < 1) return "Just now";
  //     if (diffInHours < 24) return `${diffInHours}h ago`;
  //     const diffInDays = Math.floor(diffInHours / 24);
  //     if (diffInDays < 7) return `${diffInDays}d ago`;
  //     return date.toLocaleDateString();
  //   };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/listings")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Listings</span>
        </button>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-yellow-600 transition-colors">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Images & Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-video bg-gray-100">
              <img
                src={listing.images?.[selectedImageIndex] || "/placeholder.png"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {isBoosted && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⚡ Boosted
                </div>
              )}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {listing.images?.length || 1}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {listing.images?.length > 1 && (
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
        </div>

        {/* Right Section - Price & Seller Info */}
        <div className="space-y-6 sticky top-6 self-start">
          {/* Price Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
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

            {!isOwner ? (
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm font-medium">
                This is your listing
              </div>
            )}
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
              <div>
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
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Member since Jan 2024</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>LPU Campus</span>
            </div>
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
                onClick={() => navigate(`/listing/${similarListing.id}`)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={similarListing.images?.[0] || "/placeholder.png"}
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
