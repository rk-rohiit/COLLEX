import React from "react";
import { Clock, User, Package, MessageCircle } from "lucide-react";

const activities = [
  {
    type: "listing",
    message: "Arjun Sharma listed Engineering Mathematics Textbook",
    time: "2 minutes ago",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    type: "message",
    message: "New message in MacBook Air conversation",
    time: "5 minutes ago",
    icon: MessageCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    type: "user",
    message: "Priya Singh joined the marketplace",
    time: "1 hour ago",
    icon: User,
    color: "bg-purple-100 text-purple-600",
  },
  {
    type: "listing",
    message: "Study Table marked as rented",
    time: "2 hours ago",
    icon: Package,
    color: "bg-orange-100 text-orange-600",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
        View All Activity →
      </button>
    </div>
  );
}
