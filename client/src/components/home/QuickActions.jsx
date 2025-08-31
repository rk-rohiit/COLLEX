import React from "react";
import { Plus, Search, MessageCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "List an Item",
      description: "Sell or rent your stuff",
      icon: Plus,
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/create"),
    },
    {
      title: "Browse Items",
      description: "Find what you need",
      icon: Search,
      color: "from-emerald-500 to-emerald-600",
      action: () => navigate("/listings"),
    },
    {
      title: "My Chats",
      description: "Continue conversations",
      icon: MessageCircle,
      color: "from-purple-500 to-purple-600",
      //   action: () => navigate("/chat"),
      alert: "Chat feature coming soon!",
      // action: chatHandlePopup,
    },
    {
      title: "Boost Listing",
      description: "Get more visibility",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      action: () => navigate("/profile"),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-left"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
