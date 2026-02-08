import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Check,
  Clock,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

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
    hostelBlock: "",
    password: "",
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.email && formData.fullName;
      case 2:
        return formData.phone;
      case 3:
        return formData.course && formData.year;
      case 4:
        return formData.password;
      default:
        return true;
    }
  };

  const nextStep = () => validateStep(currentStep) && setCurrentStep((s) => s + 1);
  const prevStep = () => setCurrentStep((s) => s - 1);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/signIn");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      setLoading(false);
      alert("Server error, try again later");
    }
  };

  // ================= STEPS =================
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
          <Input
            icon={Lock}
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 to-cyan-400 text-white p-12">
        <img src={Logo} alt="Collex" className="h-16" />
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          {renderStep()}

          <div className="flex justify-between mt-6">
            <button disabled={currentStep === 1} onClick={prevStep}>Back</button>
            {currentStep < totalSteps ? (
              <button onClick={nextStep}>Next</button>
            ) : (
              <button onClick={handleSubmit}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ REUSABLE INPUTS ============
const Input = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input {...props} className="w-full pl-10 p-2 border rounded" />
    </div>
  </div>
);

const Select = ({ children, ...props }) => (
  <select {...props} className="w-full p-2 border rounded">{children}</select>
);

export default SignUp;
