import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../navigation/Header";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Show Navbar if logged in, else Header */}
      {user ? <Navbar /> : <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
