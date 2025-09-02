import React, { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/common/Loader.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Login function (save user & token)
  const login = (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // ✅ Logout function (clear data)
  const logout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // ✅ Show loader until authentication is resolved
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
