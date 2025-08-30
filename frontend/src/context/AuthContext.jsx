import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Mock users data
const mockUsers = [
  {
    id: "1",
    email: "student@lpu.edu.in",
    name: "Arjun Sharma",
    phone: "9876543210",
    campusId: "lpu",
    course: "B.Tech CSE",
    year: "3rd Year",
    hostel: "Block A",
    role: "student",
    verified: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    email: "admin@lpu.edu.in",
    name: "Admin User",
    campusId: "lpu",
    course: "Staff",
    year: "N/A",
    role: "admin",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "priya@lpu.edu.in",
    name: "Priya Singh",
    phone: "9876543211",
    campusId: "lpu",
    course: "B.Com",
    year: "2nd Year",
    hostel: "Block B",
    role: "student",
    verified: false,
    createdAt: "2024-01-20T14:30:00Z",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("collex_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUserProfile(userData);
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // Simulate authentication
      const foundUser = mockUsers.find((u) => u.email === email);
      if (!foundUser || password !== "password") {
        throw new Error("Invalid credentials");
      }

      setUser(foundUser);
      setUserProfile(foundUser);
      localStorage.setItem("collex_user", JSON.stringify(foundUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    setLoading(true);
    try {
      // Check if email domain is allowed
      const allowedDomains = ["lpu.edu.in", "student.lpu.edu.in"];
      const emailDomain = userData.email.split("@")[1];

      if (!allowedDomains.includes(emailDomain)) {
        throw new Error("Please use your official college email address");
      }

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === userData.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name || "",
        phone: userData.phone,
        campusId: "lpu",
        course: userData.course || "",
        year: userData.year || "",
        hostel: userData.hostel,
        role: "student",
        verified: false, // Requires admin verification
        createdAt: new Date().toISOString(),
      };

      mockUsers.push(newUser);
      setUser(newUser);
      setUserProfile(newUser);
      localStorage.setItem("collex_user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem("collex_user");
  };

  const updateProfile = async (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUserProfile(updatedUser);
    localStorage.setItem("collex_user", JSON.stringify(updatedUser));

    // Update in mock data
    const userIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (userIndex >= 0) {
      mockUsers[userIndex] = updatedUser;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
