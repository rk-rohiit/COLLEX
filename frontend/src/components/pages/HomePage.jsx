import React from "react";
import { FeaturedListings } from "../listings/FeaturedListings";
import { QuickActions } from "../home/QuickActions";
import { CategoryGrid } from "../home/CategoryGrid";
import { RecentActivity } from "../home/RecentActivity";
import { CampusStats } from "../home/CampusStats";

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Find Everything You Need on Campus
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            Buy, sell, and rent textbooks, electronics, bikes, and more from
            verified LPU students.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.navigateTo?.("/create")}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              List an Item
            </button>
            <button
              onClick={() => window.navigateTo?.("/listings")}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Browse Items
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Campus Stats */}
      <CampusStats />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Listings */}
      <FeaturedListings />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
