import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../components/pages/Home";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import Dashboard from "../components/pages/Dashboard";
import UserPage from "../components/pages/UserPage.jsx";

// New pages
import { ListingsPage } from "../components/pages/ListingsPage";
import { CreateListingPage } from "../components/pages/CreateListingPage";
import { ListingDetailPage } from "../components/pages/ListingDetailPage";
// import ChatPage from "../components/pages/ChatPage";
// import ProfilePage from "../components/pages/ProfilePage";
// import AdminPage from "../components/pages/AdminPage";

// 🚧 Auth routes are disabled for now
// import ProtectedRoute from "./ProtectedRoute";
// import AdminRoute from "./AdminRoute";

const AppRoutes = ({ userProfile, listingId }) => {
  return (
    <Routes>
      {/* Public Layout Wrapper */}
      <Route element={<Layout />}>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Listings pages */}
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/create" element={<CreateListingPage />} />
        <Route
          path="/listing"
          element={<ListingDetailPage listingId={listingId} />}
        />

        {/* Chat and Profile */}
        {/* <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}

        {/* User page (accessible without login for now) */}
        <Route path="/user" element={<UserPage />} />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={userProfile?.role === "admin" ? <AdminPage /> : <Home />}
        />

        {/* Admin dashboard route (legacy) */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* Authentication Pages */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
