// src/components/common/Loader.jsx
import React from "react";

const Loader = ({ size = "md", color = "border-blue-600" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 ${color} ${sizeClasses[size]}`}
    />
  );
};

export default Loader;
