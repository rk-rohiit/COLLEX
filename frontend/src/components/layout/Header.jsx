import React from "react";
import { Search, Bell, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

export function Header({ currentPath }) {
  const { userProfile, signOut } = useAuth();
  const { getUnreadCount } = useChat();
  const unreadCount = getUnreadCount();

  const handleCreateListing = () => {
    window.navigateTo?.("/create");
  };

  const handleNotifications = () => {
    window.navigateTo?.("/chat");
  };

  const isAdminPath = currentPath === "/admin";
  const showSearch = ["/", "/listings"].includes(currentPath);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.navigateTo?.("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Collex</h1>
              {!isAdminPath && (
                <p className="text-xs text-gray-500">Campus Marketplace</p>
              )}
            </div>
          </div>

          {/* Search Bar (on main pages) */}
          {showSearch && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books, electronics, bikes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  //   onChange={(e) => {
                  //     // This would connect to search context
                  //   }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {!isAdminPath && (
              <>
                {/* Create Listing Button */}
                <button
                  onClick={handleCreateListing}
                  className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>List Item</span>
                </button>

                {/* Notifications */}
                <button
                  onClick={handleNotifications}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {userProfile?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {userProfile?.name}
                </p>
                <p className="text-xs text-gray-500">{userProfile?.course}</p>
              </div>
              <button
                onClick={signOut}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
