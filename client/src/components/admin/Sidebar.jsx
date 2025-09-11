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

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeSection,
  setActiveSection,
  onLogout, // ✅ Pass logout handler from parent
}) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
    { name: "Users", icon: Users, section: "users" },
    { name: "Products", icon: ShoppingBag, section: "products" },
    { name: "Settings", icon: Settings, section: "settings" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } h-screen transition-all duration-300 flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div
          className={`flex items-center space-x-3 ${
            !isSidebarOpen && "justify-center w-full"
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard size={16} />
          </div>
          {isSidebarOpen && <h1 className="text-xl font-bold">Collex</h1>}
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveSection(item.section)}
              className={`flex items-center w-full p-3 mb-2 rounded-xl transition-all duration-200 group ${
                activeSection === item.section
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  : "hover:bg-slate-700"
              }`}
            >
              <div className={`${!isSidebarOpen && "mx-auto"}`}>
                <Icon size={20} />
              </div>
              {isSidebarOpen && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
              {activeSection === item.section && isSidebarOpen && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center w-full p-3 rounded-xl transition-colors hover:bg-red-600/20 text-red-400 hover:text-red-300"
        >
          <LogOut size={20} className={`${!isSidebarOpen && "mx-auto"}`} />
          {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
