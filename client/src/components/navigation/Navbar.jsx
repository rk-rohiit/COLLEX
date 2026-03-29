import React, { useState, useEffect } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationPopup from "../pages/NotificationPopup";
import theme from "../../theme";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [userHash, setUserHash] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      const storedHash = localStorage.getItem("userHash");
      if (storedHash) setUserHash(storedHash);
      else {
        const newHash = btoa(`${user._id}-${user.email}-${Date.now()}`);
        localStorage.setItem("userHash", newHash);
        setUserHash(newHash);
      }
    }
  }, [user]);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg border-b"
      style={{
        background: "rgba(255,255,255,0.9)",
        borderColor: "#eee",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg shadow"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            <span className="text-white font-bold text-sm">C</span>
          </div>

          <span
            className="text-xl font-bold"
            style={{ color: theme.colors.textDark }}
          >
            Collex
          </span>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: theme.colors.textLight }}
            />
            <input
              type="text"
              placeholder="Search books, bikes, electronics..."
              className="w-full pl-10 pr-4 py-2.5 outline-none transition"
              style={{
                borderRadius: "999px",
                border: "1px solid #ddd",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary;
              }}
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-5">

          {/* LIST ITEM */}
          <button
            onClick={() => navigate("/create-listing")}
            className="px-5 py-2 text-white text-sm rounded-full shadow-md"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            + List Item
          </button>

          {/* NOTIFICATION */}
          <div className="relative">
            <Bell
              className="w-5 h-5 cursor-pointer"
              style={{ color: theme.colors.textLight }}
              onClick={() => setShowNotifications((prev) => !prev)}
            />
            <span
              className="absolute -top-2 -right-2 text-white text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: theme.colors.primary }}
            >
              3
            </span>
          </div>

          {/* USER MENU */}
          <UserMenu
            user={user}
            logout={logout}
            navigate={navigate}
            userHash={userHash}
          />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          {mobileMenu ? (
            <X onClick={() => setMobileMenu(false)} />
          ) : (
            <Menu onClick={() => setMobileMenu(true)} />
          )}
        </div>
      </div>

      {/* NOTIFICATIONS */}
      {showNotifications && (
        <NotificationPopup setShow={setShowNotifications} />
      )}

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-t">

          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 outline-none"
            style={{
              borderRadius: "999px",
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/create-listing");
            }}
            className="w-full py-2 text-white rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            + List Item
          </button>

          <UserMenu
            user={user}
            logout={logout}
            navigate={navigate}
            userHash={userHash}
            mobile
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;



// ✅ USER MENU COMPONENT
const UserMenu = ({ user, logout, navigate, userHash, mobile }) => {
  const [open, setOpen] = useState(false);

  // 🔓 NOT LOGGED IN
  if (!user) {
    return (
      <div className={`flex gap-3 ${mobile ? "flex-col w-full" : ""}`}>

        <button
          onClick={() => navigate("/signin")}
          style={{ color: theme.colors.textDark }}
        >
          Sign In
        </button>

        <button
          onClick={() => navigate("/signup")}
          className={`${mobile ? "w-full" : ""} px-5 py-2 text-white rounded-full`}
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        >
          Join Now 🚀
        </button>
      </div>
    );
  }

  // 🔐 LOGGED IN
  return (
    <div className="relative">

      {/* AVATAR */}
      <div
        onClick={() => (mobile ? navigate(`/user/${userHash}`) : setOpen(!open))}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        >
          <span className="text-white font-semibold">
            {user.fullName?.[0]?.toUpperCase()}
          </span>
        </div>

        {!mobile && <span>{user.fullName}</span>}
      </div>

      {/* DROPDOWN */}
      {!mobile && open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border p-2 z-50"
          style={{ background: theme.colors.background }}
        >
          <button
            onClick={() => navigate(`/user/${userHash}`)}
            className="w-full text-left px-3 py-2 rounded"
          >
            Profile
          </button>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-red-500 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};