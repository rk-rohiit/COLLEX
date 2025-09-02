import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Set this flag to `true` when developing, and `false` in production
const DEV_MODE = false;

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // ================================
  // 🚧 DEVELOPMENT MODE (Skip Auth)
  // ================================
  if (DEV_MODE) {
    return children;
  }

  // ================================
  // 🚀 PRODUCTION MODE (Enable Auth)
  // ================================

  // 1️⃣ If user is NOT logged in → Redirect to Signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2️⃣ If specific roles are required & user doesn't have one → Redirect to Home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Otherwise → Allow access
  return children;
};

export default ProtectedRoute;
