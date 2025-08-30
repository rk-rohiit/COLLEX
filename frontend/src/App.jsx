import React, { useState, useEffect } from "react";
import Router from "./components/Router.jsx"; // default export
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ListingsProvider } from "./context/ListingsContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { LoadingSpinner } from "./components/ui/LoadingSpinner.jsx";

function AppContent() {
  const { loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

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
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <ListingsProvider>
      <ChatProvider>
        <Router />
      </ChatProvider>
    </ListingsProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
