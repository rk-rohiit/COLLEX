import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert("Please enter your email and password!");
      return;
    }

    try {
      setLoading(true);

      // Send login request to backend API
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        // ✅ Save token or user data to localStorage for session management
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Navigate to /user page
        navigate("/user");
      } else {
        // ❌ Show popup error
        window.alert(
          data.message || "Invalid email or password. Please try again."
        );

        // Clear fields
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      window.alert("Something went wrong! Please try again later.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-1/2 bg-gradient-to-b from-blue-500 to-teal-500 text-white flex flex-col justify-center items-start p-16">
        <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-6">
          <span className="text-2xl font-bold">C</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Collex</h1>
        <p className="mb-6">
          The trusted campus marketplace for LPU students. Buy, sell, and rent
          textbooks, electronics, bikes, and more within your verified campus
          community.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">✅ Verified students only</li>
          <li className="flex items-center gap-2">
            ⚡ List items in under 60 seconds
          </li>
          <li className="flex items-center gap-2">💬 Safe in-app messaging</li>
        </ul>
      </div>

      {/* Right section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <div className="bg-white p-10 rounded-xl shadow-lg w-3/4 max-w-md">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="mb-6 text-gray-500">Sign in to your account</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">College Email</label>
              <input
                type="email"
                placeholder="your.name@lpu.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="text-gray-400 text-sm mt-1">
                Use your official LPU email address
              </p>
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-bold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-blue-500 font-medium cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>

          <div className="mt-6 flex justify-center gap-6 text-gray-500 text-sm">
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
