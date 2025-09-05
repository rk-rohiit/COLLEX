import React, { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationPopup from "../pages/NotificationPopup";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userHash, setUserHash] = useState("");

  // ✅ Generate userHash when user logs in
  useEffect(() => {
    if (user) {
      // Try to get hash from localStorage first
      const storedHash = localStorage.getItem("userHash");
      if (storedHash) {
        setUserHash(storedHash);
      } else {
        // If not found, generate new one
        const newHash = btoa(`${user._id}-${user.email}-${Date.now()}`);
        localStorage.setItem("userHash", newHash);
        setUserHash(newHash);
      }
    }
  }, [user]);

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Collex</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
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
          {/* Create Listing */}
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            List Item
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <Bell
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => setShowNotifications((prev) => !prev)}
            />
            {/* Notification Count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow">
              3
            </span>
          </div>

          {/* Avatar + User Menu */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              if (user && userHash) {
                navigate(`/user/${userHash}`);
              } else {
                navigate("/signin");
              }
            }}
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            {/* Username */}
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {user?.fullName || "User"}
              </div>
              {user ? (
                <div
                  className="text-red-500 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                >
                  Sign Out
                </div>
              ) : (
                <div
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/signin");
                  }}
                >
                  Sign In
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Notification Popup */}
      {showNotifications && (
        <NotificationPopup setShow={setShowNotifications} />
      )}
    </header>
  );
};

export default Navbar;
