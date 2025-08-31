import React from "react";
import { Users, Package, MessageCircle, Zap } from "lucide-react";

const stats = [
  {
    label: "Active Students",
    value: "1,247",
    icon: Users,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Items Listed",
    value: "432",
    icon: Package,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    label: "Messages Sent",
    value: "2.8k",
    icon: MessageCircle,
    color: "text-purple-600 bg-purple-100",
  },
  {
    label: "Items Sold",
    value: "89",
    icon: Zap,
    color: "text-orange-600 bg-orange-100",
  },
];

export function CampusStats() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Campus Activity
        </h2>
        <p className="text-gray-600">See how active our LPU community is!</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <div
                className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
