import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../components/pages/Home";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import LoginPage from "../components/pages/LoginPage";
import Dashboard from "../components/pages/Dashboard";
import UserPage from "../components/pages/UserPage.jsx";

// import ProtectedRoute from "./ProtectedRoute";  // 🚫 Disabled for development
// import AdminRoute from "./AdminRoute";          // 🚫 Disabled for development

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout Wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* ================================
            🚧 DEVELOPMENT MODE
            Making all pages publicly accessible
            ================================ */}

        {/* User page (No auth required for now) */}
        <Route path="/user" element={<UserPage />} />

        {/* Admin dashboard (No auth required for now) */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* Authentication Pages */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login-page" element={<LoginPage />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
