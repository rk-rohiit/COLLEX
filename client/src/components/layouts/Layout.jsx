import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";
import { motion } from "framer-motion";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <motion.main
        className="flex-1 bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;
