import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import theme from "../../theme";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, href: "/dashboard" },
    { name: "Users", icon: <Users />, href: "/users" },
    { name: "Products", icon: <ShoppingBag />, href: "/products" },
    { name: "Settings", icon: <Settings />, href: "/settings" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col`}
      style={{
        backgroundColor: theme.colors.primary,
        color: "white",
        boxShadow: theme.shadows.base,
      }}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1
          className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}
          style={{ color: "white" }}
        >
          Collex Admin
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hover:text-gray-200 transition-colors"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${theme.shadows.hover}`}
            style={{
              borderRadius: theme.borderRadius.button,
            }}
          >
            {item.icon}
            <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className={`flex items-center gap-3 px-4 py-3 transition-colors m-4 ${theme.shadows.hover}`}
        style={{
          backgroundColor: "#ef4444",
          borderRadius: theme.borderRadius.button,
        }}
      >
        <LogOut />
        <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
