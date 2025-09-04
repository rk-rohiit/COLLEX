import { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, RefreshCw } from "lucide-react";
const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div className="w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>

        {/* Mouse follower effect */}
        <div
          className="fixed pointer-events-none z-10 w-96 h-96 rounded-full opacity-10 bg-gradient-radial from-purple-400 to-transparent transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)`,
          }}
        />

        {/* Main content */}
        <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Number with glitch effect */}
            <div className="relative mb-8">
              <h1
                className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-red-500 ${
                  isGlitching ? "animate-pulse" : ""
                } transition-all duration-200`}
              >
                404
              </h1>
              {isGlitching && (
                <h1 className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500 opacity-50 translate-x-1 translate-y-1">
                  404
                </h1>
              )}
            </div>

            {/* Error message */}
            <div className="mb-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Oops! The page you're looking for seems to have vanished into
                the digital void. It might have been moved, deleted, or perhaps
                it never existed at all.
              </p>
            </div>

            {/* Floating action buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* <button
                onClick={handleGoHome}
                className="group flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Home className="w-5 h-5 group-hover:animate-bounce" />
                Go Home
              </button> */}

              <button
                onClick={handleGoBack}
                className="group flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/25 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
                Go Back
              </button>

              <button
                onClick={handleRefresh}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r  from-blue-600 via-cyan-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
              >
                <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                Refresh
              </button>
            </div>

            {/* Fun fact */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 italic">
                Fun fact: HTTP 404 errors were named after room 404 at CERN,
                where the web was born! 🌐
              </p>
            </div>
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-purple-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-16 border-2 border-pink-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-blue-500/20 rotate-12 animate-pulse"></div>
      </div>
    </>
  );
};

export default NotFoundPage;
