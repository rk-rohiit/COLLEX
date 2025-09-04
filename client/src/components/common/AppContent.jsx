import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AppRoutes from "../../routes/AppRoutes";

const AppContent = () => {
  const { loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [particles, setParticles] = useState([]);

  const loadingSteps = [
    "Initializing Collex...",
    "Connecting to campus network...",
    "Loading marketplace data...",
    "Setting up your profile...",
    "Almost ready!",
  ];

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);

    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsInitialized(true);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    // Update loading steps
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [loadingSteps.length]);

  if (loading || !isInitialized) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
          {/* Animated background particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
              }}
            />
          ))}

          {/* Main content */}
          <div className="text-center relative z-10 max-w-md mx-auto px-6">
            {/* Interactive logo with pulse effect */}
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl flex items-center justify-center mb-4 mx-auto relative overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Logo letter with bounce animation */}
                <span className="text-white font-bold text-2xl animate-bounce relative z-10">
                  C
                </span>

                {/* Pulsing rings */}
                <div className="absolute inset-0 rounded-3xl border-4 border-blue-400 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-3xl border-2 border-emerald-400 animate-pulse opacity-40"></div>
              </div>
            </div>

            {/* App name with gradient text */}
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Collex
            </h1>
            <p className="text-gray-600 mb-8 font-medium">Campus Marketplace</p>

            {/* Interactive progress bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                >
                  {/* Animated shimmer on progress bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Progress info */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">
                  {loadingSteps[currentStep]}
                </span>
                <span className="text-blue-600 font-bold">
                  {Math.round(Math.min(progress, 100))}%
                </span>
              </div>
            </div>

            {/* Interactive loading dots */}
            <div className="flex justify-center items-center space-x-2 mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>

            {/* Fun loading messages */}
            <div className="text-xs text-gray-400 italic mb-8">
              {progress < 25 && "🔍 Scanning campus deals..."}
              {progress >= 25 &&
                progress < 50 &&
                "📚 Finding textbook treasures..."}
              {progress >= 50 &&
                progress < 75 &&
                "🎒 Organizing student essentials..."}
              {progress >= 75 && progress < 100 && "✨ Adding final touches..."}
              {progress >= 100 && "🎉 Ready to explore!"}
            </div>

            {/* Interactive tip */}
            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">
                  Pro Tip
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {currentStep === 0 &&
                  "Set up your profile to get personalized recommendations!"}
                {currentStep === 1 &&
                  "Enable notifications to never miss great deals from classmates."}
                {currentStep === 2 &&
                  "Use filters to find exactly what you need for your courses."}
                {currentStep === 3 &&
                  "Check seller ratings before making a purchase."}
                {currentStep >= 4 &&
                  "Browse by category or search for specific items!"}
              </p>
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div
            className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-blue-300/30 rounded-full animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border-2 border-emerald-300/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 w-6 h-6 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full animate-bounce"></div>
        </div>

        {/* Custom animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
              }
              50% { 
                transform: translateY(-20px) rotate(180deg); 
              }
            }
          `}
        </style>
      </>
    );
  }

  return <AppRoutes />;
};

export default AppContent;
