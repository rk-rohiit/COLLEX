import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ListingsProvider } from "./context/ListingsContext";
import AppContent from "./components/common/AppContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <ListingsProvider>
        <AppContent />

        {/* ✅ SINGLE TOAST CONTAINER */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </ListingsProvider>
    </AuthProvider>
  );
};

export default App;