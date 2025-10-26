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
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    course: "",
    year: "",
    hostelBlock: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsVerified(true);
      setOpen(false);
      alert("✅ Email verified successfully!");
    } else {
      alert("❌ Invalid OTP. Try again.");
    }
  };

  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation for each step
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

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        // ✅ Save token or user
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate to /user
        navigate("/user");
      } else {
        window.alert(data.message || "Signup failed. Try again.");
        setFormData({
          email: "",
          fullName: "",
          phone: "",
          course: "",
          year: "",
          hostelBlock: "",
          password: "",
        });
        setCurrentStep(1); // reset back to step 1
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      window.alert("Something went wrong! Please try again later.");
      setFormData({
        email: "",
        fullName: "",
        phone: "",
        course: "",
        year: "",
        hostelBlock: "",
        password: "",
      });
      setCurrentStep(1);
    }
  };

  const handleSignInClick = () => {
    alert("Redirecting to Sign In...");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Basic Information
              </h3>
              <p className="text-gray-600 text-sm">
                Let's start with your basic details
              </p>
            </div>

            {/* College Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.name@lpu.edu.in"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use your official LPU email address
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600 text-sm">
                How can other students reach you?
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your phone number will be shared with buyers/sellers
              </p>
            </div>

            {/* Email Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {!isVerified ? (
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Verify
                  </button>
                ) : (
                  <span className="text-green-600 text-sm font-semibold">
                    Verified ✓
                  </span>
                )}
              </div>
            </div>

            {/* OTP Popup (Tailwind Modal) */}
            {open && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="bg-white rounded-lg shadow-lg w-80 p-6 text-center relative">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    Email Verification
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter the 4-digit OTP sent to{" "}
                    <span className="font-medium text-gray-900">
                      {formData.email || "your email"}
                    </span>
                  </p>

                  <input
                    type="text"
                    maxLength="4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="----"
                    className="w-32 text-center tracking-widest text-lg border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mx-auto mb-4"
                  />

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleVerifyOtp}
                      className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Academic Details
              </h3>
              <p className="text-gray-600 text-sm">
                Tell us about your studies
              </p>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Course</option>
                <option value="btech">B.Tech</option>
                <option value="mtech">M.Tech</option>
                <option value="bba">BBA</option>
                <option value="mba">MBA</option>
                <option value="bca">BCA</option>
                <option value="mca">MCA</option>
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* Hostel Block */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hostel Block (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="hostelBlock"
                  value={formData.hostelBlock}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Select Hostel Block</option>
                  <option value="block-a">Block A</option>
                  <option value="block-b">Block B</option>
                  <option value="block-c">Block C</option>
                  <option value="block-d">Block D</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Your Account
              </h3>
              <p className="text-gray-600 text-sm">Create a strong password</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters with mix of letters, numbers & symbols
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Blue Gradient */}
      <div className="flex-1 bg-gradient-to-br from-blue-500 to-cyan-400 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-0 text-white order-2 lg:order-1">
        <div className="max-w-md mx-auto lg:mx-0">
          {/* Logo */}
          <div className="w-32 h-20  flex items-center justify-center mb-6">
            <img
              src={Logo}
              alt="Collex Logo"
              className="object-contain h-16 w-auto border-r-4 border-b-4 border-gray-100 rounded-xl"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Title and Description */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center lg:text-left">
            Welcome to Collex
          </h1>
          <p className="text-base sm:text-lg mb-8 lg:mb-12 text-blue-50 text-center lg:text-left">
            The trusted campus marketplace for LPU students. Buy, sell, and rent
            textbooks, electronics, bikes, and more within your verified campus
            community.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="w-8 h-8 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm sm:text-base">
                Verified students only
              </span>
            </div>

            <div className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-sm sm:text-base">
                List items in under 60 seconds
              </span>
            </div>

            <div className="flex items-center space-x-3 justify-center lg:justify-start">
              <div className="w-8 h-8 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm sm:text-base">
                Safe in-app messaging
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 bg-gray-50 order-1 lg:order-2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Join Collex
            </h2>
            {/* <p className="text-gray-600 text-sm sm:text-base">
              Step {currentStep} of {totalSteps}
            </p> */}
          </div>

          {/* Progress Bar */}
          {/* <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div> */}

          {/* Form Steps */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200  ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  validateStep(currentStep)
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!validateStep(currentStep) || loading}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  validateStep(currentStep) && !loading
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
            </span>
            <button
              type="button"
              className="text-blue-500 font-medium hover:text-blue-600 transition-colors text-sm cursor-pointer"
              onClick={handleSignInClick}
            >
              <span onClick={() => navigate("/signIn")}>Sign In</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 mt-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Verified Only</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Fast</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
