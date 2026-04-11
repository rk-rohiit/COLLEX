import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "@/pages/home/Hero";
import About from "@/pages/home/About";
import Services from "@/pages/home/Services";
import Contact from "@/pages/home/Contact";

import MainLayout from "@/layouts/MainLayout";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import ProductList from "../pages/products/ProductList";
import Cart from "../pages/cart/Cart";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import OrderSuccess from "../pages/order/OrderSuccess";
import ProfilePage from "../pages/profile/ProfilePage";
import CategoryBar from "../pages/home/CategoryBar";
import ProductView from "../pages/products/ProductView";
import OrderDetail from "../pages/order/OrderDetail";
import AdminLayout from "../layouts/AdminLayout";
import HowItWorks from "../pages/home/HowItWorks";
import FeatureSection from "../pages/home/FeatureSection";
import Testimonials from "../pages/home/Testimonials";

// Landing page
const LandingPage = () => (
  <>
    <Hero />
    <CategoryBar />
    {/* <About /> */}
    <HowItWorks />
    {/* <Services /> */}
    <FeatureSection />
    <Testimonials />
    <Contact />
  </>
);

const AppRoutes = () => {
  return (
  <BrowserRouter>
  <Routes>

    {/* 🔥 PUBLIC + USER PAGES (WITH NAVBAR) */}
    <Route element={<MainLayout />}>

      <Route path="/" element={<LandingPage />} />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />

      <Route
        path="product/:id"
        element={
          <ProtectedRoute>
            <ProductView />
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

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        }
      />

    </Route>

    {/* 🔥 ADMIN PANEL (NO NAVBAR) */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      }
    />

    {/* 🔥 AUTH (NO NAVBAR) */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

  </Routes>
</BrowserRouter>
  );
};

export default AppRoutes;