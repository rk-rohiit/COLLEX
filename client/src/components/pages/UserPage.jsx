import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LogOut,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  User,
  Settings,
  List,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { showInfo } from "../../utils/toastConfig";
const UserPage = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedHash = localStorage.getItem("userHash");

      if (!storedUser || storedHash !== hash) {
        navigate("/signin");
      } else {
        setUserData(storedUser);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      navigate("/signin");
    }
  }, [hash, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userHash");
    localStorage.removeItem("token");
    logout();
    navigate("/signin");
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-gray-700 text-lg">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userData.fullName?.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4 text-center">
            {userData.fullName}
          </h1>
          <p className="text-gray-500 text-sm capitalize">{userData.role}</p>

          {/* Sidebar Actions */}
          <div className="mt-6 w-full space-y-3">
            <button
              onClick={() => navigate("/listings")}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition"
            >
              <List className="w-5 h-5" /> My Listings
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition"
            >
              <Settings className="w-5 h-5" /> Account Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Account Overview
            </h2>
            <button
              onClick={() => showInfo("Working on Edit Profile...")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Edit Profile
            </button>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{userData.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
              <Phone className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">
                  {userData.phone || "Not Provided"}
                </p>
              </div>
            </div>

            {/* Course & Year */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Course & Year</p>
                <p className="font-medium text-gray-800 capitalize">
                  {userData.course} — Year {userData.year}
                </p>
              </div>
            </div>

            {/* Hostel Block */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
              <Building2 className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">Hostel Block</p>
                <p className="font-medium text-gray-800 capitalize">
                  {userData.hostelBlock || "Not Provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 bg-blue-50 rounded-xl p-4 shadow-inner text-center">
            <p className="text-gray-700 text-sm">
              Want to add more details? Update your profile to make it more
              visible to buyers.
            </p>
            <button
              onClick={() => showInfo("Working on Update Profile...")}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
