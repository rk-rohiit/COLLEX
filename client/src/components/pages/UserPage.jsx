import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LogOut,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const UserPage = () => {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      // ✅ Get user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedHash = localStorage.getItem("userHash");

      // ✅ Security check → If hash mismatch or user not found → redirect
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

  // ✅ Handle Logout
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
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {userData.fullName?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {userData.fullName}
          </h1>
          <p className="text-gray-500 capitalize">{userData.role}</p>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Account Details
          </h2>

          {/* User Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">{userData.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{userData.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 capitalize">
                {userData.course} — Year {userData.year}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span className="text-gray-700 capitalize">
                {userData.hostelBlock || "Not Provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate("/listings")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
          >
            My Listings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
