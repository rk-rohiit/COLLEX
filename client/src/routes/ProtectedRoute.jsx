import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // ================================
  // 🚧 DEVELOPMENT MODE
  // Temporarily disabling auth & role checks
  // ================================
  return children;

  /* 
  // ================================
  // 🚀 PRODUCTION MODE
  // Enable this block when finalizing auth
  // ================================

  // Not logged in → Redirect to Signin
  if (!user) return <Navigate to="/signin" replace />;

  // Role not allowed → Redirect to Home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
  */
};

export default ProtectedRoute;
