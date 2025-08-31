import React, { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/common/Loader.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check for saved user in localStorage on first load
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  // ✅ Login function
  const login = async (userData) => {
    setLoading(true);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loader until auth status is resolved
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
