import React from "react";
import {
  Search,
  Bell,
  Plus,
  Eye,
  MessageSquare,
  TrendingUp,
  Zap,
} from "lucide-react";
const HeroSection = () => {
  const actions = [
    {
      icon: Plus,
      title: "List an Item",
      subtitle: "Sell or rent your stuff",
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      icon: Search,
      title: "Browse Items",
      subtitle: "Find what you need",
      bgColor: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      icon: MessageSquare,
      title: "My Chats",
      subtitle: "Continue conversations",
      bgColor: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Boost Listing",
      subtitle: "Get more visibility",
      bgColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
  ];
  const stats = [
    {
      icon: Eye,
      number: "1,247",
      label: "Active Students",
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      number: "432",
      label: "Items Listed",
      color: "text-green-500",
    },
    {
      icon: TrendingUp,
      number: "2.8k",
      label: "Messages Sent",
      color: "text-purple-500",
    },
    { icon: Zap, number: "89", label: "Items Sold", color: "text-orange-500" },
  ];
  const categories = [
    {
      name: "Electronics",
      count: "94+ items",
      icon: "📱",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Textbooks",
      count: "112+ items",
      icon: "📚",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Vehicles",
      count: "36+ items",
      icon: "🚲",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Furniture",
      count: "28+ items",
      icon: "🪑",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      name: "Clothing",
      count: "67+ items",
      icon: "👕",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      name: "Sports",
      count: "15+ items",
      icon: "⚽",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      name: "Stationery",
      count: "45+ items",
      icon: "✏️",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      name: "Other",
      count: "23+ items",
      icon: "📦",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
  ];
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Find Everything You Need on Campus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Buy, sell, and rent textbooks, electronics, bikes, and more from
            verified LSU students.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              List an Item
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10">
              Browse Items
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div
                className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center mb-4`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Campus Activity
          </h2>
          <p className="text-gray-600 text-center mb-8">
            See how active our LSU community is!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="text-2xl mb-3">{category.icon}</div>
              <h3 className={`font-semibold ${category.textColor} mb-1`}>
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Boosted */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Boosted Listings</h2>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
            Featured
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src="/api/placeholder/400/200"
              alt="Engineering Mathematics Textbook"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                Available
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Engineering Mathematics Textbook - Semester 3
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Excellent condition textbook for Engineering Mathematics. Perfect
              for Semester 3 students. All chapters intact, minimal
              highlighting.
            </p>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">€450</div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">📚 Book & Notes (1)</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">Interested</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">R</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Ryan Sharma
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
