import React, { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { registerUser } from "../../api/auth.api";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
      };

      const data = await registerUser(payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/signIn");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Input icon={Mail} label="College Email" placeholder="you@lpu.edu.in" name="email" value={formData.email} onChange={handleInputChange} />
            <Input icon={User} label="Full Name" placeholder="Enter your full name" name="fullName" value={formData.fullName} onChange={handleInputChange} />
          </>
        );

      case 2:
        return (
          <Input icon={Phone} label="Phone Number" placeholder="9876543210" name="phone" value={formData.phone} onChange={handleInputChange} />
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
          <Input icon={Lock} label="Password" type="password" placeholder="Create strong password" name="password" value={formData.password} onChange={handleInputChange} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-12 flex-col justify-between">
        <img src={Logo} alt="Collex" className="h-16" />
        <div>
          <h1 className="text-3xl font-bold mb-4">Welcome to Collex 🚀</h1>
          <p className="text-lg opacity-80">
            Join your campus marketplace and connect with students easily.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          {/* HEADER */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">Step {currentStep} of {totalSteps}</p>

          {/* PROGRESS BAR */}
          <div className="w-full bg-gray-200 h-2 rounded mb-6">
            <div
              className="h-2 bg-red-600 rounded transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* FORM */}
          <div className="space-y-4">{renderStep()}</div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Back
            </button>

            <button
              onClick={currentStep < totalSteps ? nextStep : handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              {currentStep < totalSteps ? "Next" : loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// INPUT
const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        {...props}
        className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
      />
    </div>
  </div>
);

// SELECT
const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
  >
    {children}
  </select>
);

export default SignUp;