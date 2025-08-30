import React, { useState } from "react";
import {
  Edit3,
  Settings,
  Star,
  TrendingUp,
  Package,
  Eye,
  Heart,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useListings } from "../../context/ListingsContext";
import { ListingCard } from "../listings/ListingCard";

export function ProfilePage() {
  const { userProfile, updateProfile } = useAuth();
  const { getUserListings } = useListings();
  const [activeTab, setActiveTab] = useState("active");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userProfile?.name || "",
    phone: userProfile?.phone || "",
    hostel: userProfile?.hostel || "",
  });

  const userListings = getUserListings(userProfile?.id || "");
  const activeListings = userListings.filter((l) => l.status === "active");
  const soldListings = userListings.filter((l) =>
    ["sold", "rented"].includes(l.status)
  );

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const tabs = [
    { id: "active", label: "Active Listings", count: activeListings.length },
    { id: "sold", label: "Sold/Rented", count: soldListings.length },
    { id: "settings", label: "Settings" },
  ];

  const stats = [
    {
      label: "Total Listings",
      value: userListings.length,
      icon: Package,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Items Sold",
      value: soldListings.length,
      icon: TrendingUp,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Total Views",
      value: "1.2k",
      icon: Eye,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-600 bg-yellow-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {userProfile?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userProfile?.name}
              </h1>
              <p className="text-gray-600">
                {userProfile?.course} • {userProfile?.year}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Verified
                </span>
                {userProfile?.hostel && (
                  <span className="text-sm text-gray-500">
                    {userProfile.hostel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hostel
                </label>
                <select
                  value={editData.hostel}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, hostel: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Hostel</option>
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                  <option value="Block C">Block C</option>
                  <option value="Block D">Block D</option>
                  <option value="Day Scholar">Day Scholar</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "active" && (
            <div>
              {activeListings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No active listings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by creating your first listing
                  </p>
                  <button
                    onClick={() => window.navigateTo?.("/create")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      viewMode="grid"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "sold" && (
            <div>
              {soldListings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No completed sales
                  </h3>
                  <p className="text-gray-600">
                    Your sold and rented items will appear here
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {soldListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      viewMode="grid"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Get notified about new messages and listing updates
                      </p>
                    </div>
                    <button className="bg-blue-600 w-12 h-6 rounded-full relative">
                      <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Show Phone Number
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow buyers to see your phone number
                      </p>
                    </div>
                    <button className="bg-gray-300 w-12 h-6 rounded-full relative">
                      <div className="bg-white w-5 h-5 rounded-full absolute left-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Privacy & Safety
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <p className="font-medium text-gray-900">Blocked Users</p>
                    <p className="text-sm text-gray-600">
                      Manage blocked users
                    </p>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <p className="font-medium text-gray-900">Report History</p>
                    <p className="text-sm text-gray-600">
                      View your reported items
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <p className="font-medium text-gray-900">
                      Download My Data
                    </p>
                    <p className="text-sm text-gray-600">
                      Get a copy of your data
                    </p>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition-colors">
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
