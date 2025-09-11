import React, { useState, useEffect } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationPopup from "../pages/NotificationPopup";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userHash, setUserHash] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  // ✅ Generate userHash when user logs in
  useEffect(() => {
    if (user) {
      const storedHash = localStorage.getItem("userHash");
      if (storedHash) {
        setUserHash(storedHash);
      } else {
        const newHash = btoa(`${user._id}-${user.email}-${Date.now()}`);
        localStorage.setItem("userHash", newHash);
        setUserHash(newHash);
      }
    }
  }, [user]);

  return (
    <header className="bg-white shadow-md border-b px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Collex</span>
        </div>

        {/* Search (desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search books, electronics, bikes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Create Listing */}
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            List Item
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <Bell
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => setShowNotifications((prev) => !prev)}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow">
              3
            </span>
          </div>

          {/* Avatar + User Menu */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => {
              if (user && userHash) {
                navigate(`/user/${userHash}`);
              } else {
                navigate("/signin");
              }
            }}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900 group-hover:text-blue-600">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {mobileMenu ? (
            <X
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setMobileMenu(true)}
            />
          )}
        </div>
      </div>

      {/* ✅ Notification Popup */}
      {showNotifications && (
        <NotificationPopup setShow={setShowNotifications} />
      )}

      {/* ✅ Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-3 p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/create-listing");
            }}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            List Item
          </button>

          <div
            className="flex items-center space-x-3"
            onClick={() => {
              setMobileMenu(false);
              if (user && userHash) navigate(`/user/${userHash}`);
              else navigate("/signin");
            }}
          >
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
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
      )}
    </header>
  );
};

export default Navbar;
