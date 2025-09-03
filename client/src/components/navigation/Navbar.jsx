import React from "react";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Collex</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search books, electronics, bikes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            List Item
          </button>
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />

          <div className="flex items-center space-x-2 cursor-pointer">
            {/* Avatar */}
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>

            {/* Username & Logout */}
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {user?.fullName || "User"}
              </div>
              <div
                className="text-red-500 hover:underline cursor-pointer"
                onClick={logout}
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
