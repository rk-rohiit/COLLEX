import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ListingsProvider } from "./context/ListingsContext";
import AppContent from "./components/common/AppContent";

const App = () => {
  return (
    <AuthProvider>
      <ListingsProvider>
        <AppContent />
      </ListingsProvider>
    </AuthProvider>
  );
};

export default App;
