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
      } bg-[#1f1f2e] text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1
          className={`text-xl font-bold text-white ${
            !isSidebarOpen && "hidden"
          }`}
        >
          Collex Admin
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-300 hover:text-white"
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
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#29293d] transition-colors"
          >
            {item.icon}
            <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 transition-colors m-4 rounded"
      >
        <LogOut />
        <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
