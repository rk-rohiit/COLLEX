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

const AppRoutes = ({ userProfile, listingId }) => {
  return (
    <Routes>
      {/* All routes inside Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/create" element={<CreateListingPage />} />
        <Route
          path="/listing"
          element={<ListingDetailPage listingId={listingId} />}
        />
        <Route path="/user" element={<UserPage />} />
        <Route
          path="/admin"
          element={userProfile?.role === "admin" ? <Dashboard /> : <Home />}
        />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 404 */}
      <Route
        path="*"
        element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
