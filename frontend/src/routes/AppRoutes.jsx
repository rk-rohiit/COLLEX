import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "@/pages/home/Hero";
import About from "@/pages/home/About";
import Services from "@/pages/home/Services";
import Contact from "@/pages/home/Contact";

import MainLayout from "@/layouts/MainLayout";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute"; // 🔥 IMPORTANT
import ProductList from "../pages/products/ProductList";
import Cart from "../pages/cart/Cart";
import CheckoutPage from "../pages/checkout/CheckoutPage";

// 🔥 Landing Page Wrapper
const LandingPage = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Services />
      <Contact />
    </MainLayout>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout"
          element={<ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;