import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../components/pages/Home";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Dashboard from "../components/pages/Dashboard";
import UserPage from "../components/pages/UserPage.jsx";
import { ListingsPage } from "../components/pages/ListingsPage";
import { CreateListingPage } from "../components/pages/CreateListingPage";
import { ListingDetailPage } from "../components/pages/ListingDetailPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = ({ userProfile }) => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ✅ Home Page */}
        <Route path="/" element={<Home />} />

        {/* ✅ Listings Page */}
        <Route
          path="/listings"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Create Listing Page (only for logged-in users) */}
        <Route
          path="/create"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Listing Details Page with :id — Restricted */}
        <Route
          path="/listing/:id"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingDetailPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Secure User Page */}
        <Route
          path="/user/:hash"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Dashboard */}
        <Route
          path="/admin"
          element={userProfile?.role === "admin" ? <Dashboard /> : <Home />}
        />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* ✅ Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ✅ 404 Fallback */}
      <Route
        path="*"
        element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
