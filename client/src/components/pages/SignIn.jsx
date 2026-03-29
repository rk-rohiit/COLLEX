import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { toastStyle } from "../../toastConfig";
import { loginUser } from "../../api/auth.api"; // ✅ API IMPORT
import Logo from "../../assets/logo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields", toastStyle);
      return;
    }

    setLoading(true);

    try {
      // ✅ CALL API
      const data = await loginUser(formData);

      if (data.success) {
        login(data.user, data.token);

        const userHash = btoa(
          `${data.user.id}-${data.user.email}-${Date.now()}`
        );

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userHash", userHash);

        toast.success(`Welcome back, ${data.user.fullName} 👋`, toastStyle);

        setTimeout(() => {
          navigate(`/user/${userHash}`);
        }, 1200);
      }
    } catch (error) {
      toast.error(error.message || "Login failed", toastStyle);
      setFormData((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-amber-100">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-amber-400 text-white p-12 flex-col justify-between">
        <img src={Logo} alt="Collex" className="h-16" />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-lg opacity-90">
            Continue your journey with Collex marketplace.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Sign In
          </h2>
          <p className="text-gray-500 mb-6">
            Access your account
          </p>

          <form onSubmit={handleSignIn} className="space-y-5">

            <Input
              icon={Mail}
              name="email"
              type="email"
              placeholder="your.name@lpu.edu.in"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              icon={Lock}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 shadow-md disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-500 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// INPUT COMPONENT
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
    <input
      {...props}
      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
    />
  </div>
);

export default SignIn;