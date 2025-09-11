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

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Normal Layout Routes (with Header + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/listings"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-listing"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listing/:id"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <ListingDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:hash"
          element={
            <ProtectedRoute allowedRoles={["student", "admin"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ✅ Admin Dashboard (No Layout, No Protected while developing) */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* ✅ Auth Routes (No Layout) */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ✅ 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
