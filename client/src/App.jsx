import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ListingsProvider } from "./context/ListingsContext";
import Loader from "./components/common/Loader"; // ✅ default import

const AppContent = () => {
  const { loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collex</h1>
          <p className="text-gray-600 mb-6">Campus Marketplace</p>
          <Loader size="md" color="border-blue-600" />
        </div>
      </div>
    );
  }

  return <AppRoutes />;
};

const App = () => {
  return (
    <AuthProvider>
      <ListingsProvider>
        <AppRoutes />
      </ListingsProvider>
    </AuthProvider>
  );
};

export default App;
