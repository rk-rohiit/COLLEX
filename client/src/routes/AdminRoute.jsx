import React from "react";
// import { Navigate } from "react-router-dom";  // 🚫 Disabled for development
// import { useAuth } from "../context/AuthContext";  // 🚫 Disabled for development

const AdminRoute = ({ children }) => {
  // ================================
  // 🚧 DEVELOPMENT MODE
  // Authentication & Role Protection Disabled
  // ================================
  return children;

  // ================================
  // ✅ PRODUCTION MODE
  // Uncomment the code below when enabling auth
  // ================================
  /*
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;

  return user.role === "admin" ? children : <Navigate to="/" replace />;
  */
};

export default AdminRoute;
