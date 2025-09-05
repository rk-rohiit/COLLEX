import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../components/pages/Home";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Dashboard from "../components/pages/Dashboard";
import UserPage from "../components/pages/UserPage";
import { ListingsPage } from "../components/pages/ListingsPage";
import { CreateListingPage } from "../components/pages/CreateListingPage";
import { ListingDetailPage } from "../components/pages/ListingDetailPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../components/pages/NotFoundPage";

const AppRoutes = ({ userProfile }) => {
  return (
    <Routes>
      {/* ✅ Layout Wrapper */}
      <Route element={<Layout />}>
        {/* ✅ Home */}
        <Route path="/" element={<Home />} />

        {/* ✅ Listings */}
        <Route
          path="/listings"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Create Listing */}
        <Route
          path="/create-listing"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Listing Details */}
        <Route
          path="/listing/:id"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingDetailPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ User Profile (hash required) */}
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
