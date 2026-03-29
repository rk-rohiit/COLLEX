import React, { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.png";
import { registerUser } from "../../api/auth.api";
import { toast } from "react-toastify";
import { toastStyle } from "../../toastConfig";

const SignUp = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    course: "",
    year: "",
    password: "",
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.email.includes("@") && formData.fullName.trim();
      case 2:
        return formData.phone.length >= 10;
      case 3:
        return formData.course && formData.year;
      case 4:
        return formData.password.length >= 6;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please complete required fields", toastStyle);
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill all required fields", toastStyle);
      return;
    }

    setLoading(true);

    try {
      const payload = { ...formData, year: Number(formData.year) };
      const data = await registerUser(payload);

      if (data.success) {
        toast.success("Account created successfully 🎉", toastStyle);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => navigate("/signIn"), 1500);
      } else {
        toast.error(data.message || "Signup failed", toastStyle);
      }
    } catch (err) {
      toast.error("Something went wrong!", toastStyle);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input icon={Mail} label="College Email" name="email" value={formData.email} onChange={handleInputChange} />
            <Input icon={User} label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </>
        );
      case 2:
        return (
          <Input icon={Phone} label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
        );
      case 3:
        return (
          <>
            <Select name="course" value={formData.course} onChange={handleInputChange}>
              <option value="">Select Course</option>
              <option value="btech">B.Tech</option>
              <option value="mtech">M.Tech</option>
              <option value="bba">BBA</option>
              <option value="mba">MBA</option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
            </Select>

            <Select name="year" value={formData.year} onChange={handleInputChange}>
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </Select>
          </>
        );
      case 4:
        return (
          <Input icon={Lock} label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-amber-100">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-amber-400 text-white p-12 flex-col justify-between">
        <img src={Logo} alt="Collex" className="h-16" />
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Collex 🚀</h1>
          <p className="text-lg opacity-90">Campus marketplace made simple.</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Step {currentStep} of {totalSteps}
          </p>

          {/* Progress */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <motion.div
              className="h-2 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Animated Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Back
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={currentStep < totalSteps ? nextStep : handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 shadow-md"
            >
              {currentStep < totalSteps
                ? "Next"
                : loading
                ? "Creating..."
                : "Create Account"}
            </motion.button>
          </div>

          {/* Login */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signIn")}
              className="text-orange-500 font-medium cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// INPUT
const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="text-sm text-gray-700">{label}</label>
    <div className="relative mt-1">
      <Icon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
      <input
        {...props}
        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </div>
  </div>
);

// SELECT
const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
  >
    {children}
  </select>
);

export default SignUp;