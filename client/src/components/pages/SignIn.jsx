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
      alert("⚠ Please enter your email and password!");
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
        // ✅ FIX: use data.user (not data.data)
        login(data.user, data.token);

        const userHash = btoa(
          `${data.user.id}-${data.user.email}-${Date.now()}`
        );

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userHash", userHash);

        alert(`✅ Welcome back, ${data.user.fullName}!`);

        navigate(`/user/${userHash}`);
      } else {
        alert(data.message || "❌ Invalid email or password");
        setPassword("");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("❌ Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT */}
      <div className="lg:w-1/2 bg-gradient-to-b from-blue-500 to-teal-500 text-white flex flex-col justify-center p-10">
        <img src={Logo} alt="Collex" className="h-16 mb-6" />
        <h1 className="text-4xl font-bold mb-4">Welcome to Collex</h1>
        <p className="mb-6">
          Trusted campus marketplace for LPU students.
        </p>
      </div>

      {/* RIGHT */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="your.name@lpu.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg ${
                loading ? "opacity-50" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
