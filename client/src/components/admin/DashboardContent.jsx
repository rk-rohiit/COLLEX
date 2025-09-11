import React from "react";
import {
  DollarSign,
  Users,
  Package,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

const DashboardContent = () => {
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231",
      change: "+12%",
      icon: <DollarSign className="text-green-600" size={24} />,
      color: "green",
    },
    {
      name: "Active Users",
      value: "2,847",
      change: "+8%",
      icon: <Users className="text-blue-600" size={24} />,
      color: "blue",
    },
    {
      name: "Products Sold",
      value: "1,423",
      change: "+15%",
      icon: <Package className="text-purple-600" size={24} />,
      color: "purple",
    },
    {
      name: "Conversion Rate",
      value: "3.24%",
      change: "+2.1%",
      icon: <TrendingUp className="text-orange-600" size={24} />,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </h3>
            <BarChart3 className="text-gray-500" size={20} />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart placeholder</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              User Activity
            </h3>
            <PieChart className="text-gray-500" size={20} />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Activity chart placeholder</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    New user registered
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
