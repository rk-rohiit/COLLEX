import React, { useState } from "react";
import {
  Users,
  Flag,
  TrendingUp,
  AlertCircle,
  Check,
  X,
  Eye,
  Package,
} from "lucide-react";

// Mock admin data
const mockPendingUsers = [
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul.kumar@student.lpu.edu.in",
    course: "B.Tech ME",
    year: "1st Year",
    hostel: "Block C",
    submittedAt: "2024-01-21T10:30:00Z",
  },
  {
    id: "4",
    name: "Anjali Patel",
    email: "anjali.patel@student.lpu.edu.in",
    course: "BBA",
    year: "2nd Year",
    hostel: "Block D",
    submittedAt: "2024-01-21T14:15:00Z",
  },
];

const mockReports = [
  {
    id: "1",
    type: "listing",
    targetTitle: "Suspicious Electronics Sale",
    reportedBy: "Student User",
    reason: "Fake/Fraudulent listing",
    status: "open",
    createdAt: "2024-01-21T09:00:00Z",
  },
  {
    id: "2",
    type: "user",
    targetTitle: "Inappropriate Behavior",
    reportedBy: "Another Student",
    reason: "Harassment in chat",
    status: "open",
    createdAt: "2024-01-20T16:45:00Z",
  },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [pendingUsers, setPendingUsers] = useState(mockPendingUsers);

  const handleVerifyUser = (userId) => {
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
    // In real app, this would make API call to approve/reject user
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    {
      id: "users",
      label: "User Verification",
      icon: Users,
      badge: pendingUsers.length,
    },
    { id: "reports", label: "Reports", icon: Flag, badge: mockReports.length },
    { id: "listings", label: "Listings", icon: Eye },
  ];

  const stats = [
    {
      label: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      label: "Active Listings",
      value: "432",
      change: "+8%",
      changeType: "positive",
      icon: Package,
    },
    {
      label: "Reports Pending",
      value: mockReports.length,
      change: "-2",
      changeType: "negative",
      icon: AlertCircle,
    },
    {
      label: "Revenue (MTD)",
      value: "₹12,450",
      change: "+25%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage users, listings, and campus marketplace operations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-900">
                      <strong>Arjun Sharma</strong> listed a new item:
                      Engineering Mathematics Textbook
                    </p>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-900">
                      New user registration: <strong>Rahul Kumar</strong>{" "}
                      awaiting verification
                    </p>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("users")}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Users className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">Verify Users</p>
                    <p className="text-sm text-gray-600">
                      {pendingUsers.length} pending
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("reports")}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Flag className="w-6 h-6 text-red-600 mb-2" />
                    <p className="font-medium text-gray-900">Review Reports</p>
                    <p className="text-sm text-gray-600">
                      {mockReports.length} open
                    </p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-600">Full dashboard</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  User Verification Queue
                </h3>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingUsers.length} Pending
                </span>
              </div>

              {pendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    All caught up!
                  </h4>
                  <p className="text-gray-600">No users pending verification</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {user.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.course} • {user.year} • {user.hostel}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVerifyUser(user.id, false)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerifyUser(user.id, true)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reports & Moderation
                </h3>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>All Reports</option>
                  <option>Open</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              report.type === "listing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {report.type}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            {report.status}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900">
                          {report.targetTitle}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Reported by <strong>{report.reportedBy}</strong> for:{" "}
                          {report.reason}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(report.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors">
                          View
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors">
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "listings" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Listing Moderation
                </h3>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Flagged</option>
                    <option>Removed</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>All Categories</option>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Vehicles</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Listing Moderation
                </h4>
                <p className="text-gray-600">
                  Advanced listing moderation tools will be available here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
