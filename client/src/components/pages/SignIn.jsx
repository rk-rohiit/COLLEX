import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert("⚠ Please enter your email and password!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login API Response:", data);

      if (res.ok && data.success) {
        // ✅ Save user data in Auth Context
        login(data.data, data.token || null);

        // ✅ Generate a unique userHash
        const userHash = btoa(
          `${data.data._id}-${data.data.email}-${Date.now()}`
        );

        // ✅ Save to localStorage
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("userHash", userHash);

        // ✅ Show success alert
        window.alert(`✅ Welcome back, ${data.data.fullName}!`);

        // ✅ Redirect user to secure UserPage
        navigate(`/user/${userHash}`);
      } else {
        window.alert(
          data.message || "❌ Invalid email or password. Try again."
        );
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login Error:", error);
      window.alert("❌ Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section */}
      <div className="lg:w-1/2 w-full bg-gradient-to-b from-blue-500 to-teal-500 text-white flex flex-col justify-center items-start p-8 sm:p-12 md:p-16">
        {/* Logo */}
        <div className="w-32 h-20 flex items-center justify-center mb-6">
          <img
            src={Logo}
            alt="Collex Logo"
            className="object-contain h-16 w-auto border-r-4 border-b-4 border-gray-100 rounded-xl"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to Collex
        </h1>

        {/* Description */}
        <p className="mb-6 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
          The trusted campus marketplace for LPU students. Buy, sell, and rent
          textbooks, electronics, bikes, and more within your verified campus
          community.
        </p>

        {/* Features */}
        <ul className="space-y-3 text-sm sm:text-base">
          <li className="flex items-center gap-2">✅ Verified students only</li>
          <li className="flex items-center gap-2">
            ⚡ List items in under 60 seconds
          </li>
          <li className="flex items-center gap-2">💬 Safe in-app messaging</li>
        </ul>
      </div>

      {/* Right section */}
      <div className="lg:w-1/2 w-full flex justify-center items-center bg-gray-50 p-6 sm:p-10">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center lg:text-left">
            Welcome Back
          </h2>
          <p className="mb-6 text-gray-500 text-center lg:text-left text-sm sm:text-base">
            Sign in to your account
          </p>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm sm:text-base">
                College Email
              </label>
              <input
                type="email"
                placeholder="your.name@lpu.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Use your official LPU email address
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-1 text-gray-700 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold transition text-sm sm:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-gray-500 text-sm sm:text-base">
            Don't have an account?{" "}
            <span
              className="text-blue-500 font-medium cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>

          {/* Footer Features */}
          <div className="mt-6 flex justify-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm flex-wrap">
            <div className="flex items-center gap-1">✅ Verified Only</div>
            <div className="flex items-center gap-1">🔒 Secure</div>
            <div className="flex items-center gap-1">⚡ Fast</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
