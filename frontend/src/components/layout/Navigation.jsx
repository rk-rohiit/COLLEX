import React from "react";
import { Home, Search, MessageCircle, User, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

export function Navigation({ currentPath }) {
  const { userProfile } = useAuth();
  const { getUnreadCount } = useChat();
  const unreadCount = getUnreadCount();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/listings", icon: Search, label: "Browse" },
    { path: "/chat", icon: MessageCircle, label: "Chats", badge: unreadCount },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  if (userProfile?.role === "admin") {
    navItems.push({ path: "/admin", icon: Shield, label: "Admin" });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => window.navigateTo?.(item.path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
