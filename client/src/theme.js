// src/theme.js
const theme = {
  colors: {
    primary: "#2563EB", // blue-600
    secondary: "#06B6D4", // cyan-500
    textDark: "#1F2937", // gray-900
    textLight: "#6B7280", // gray-600
    background: "#FFFFFF",
    sectionBg: "#F9FAFB",
  },
  gradients: {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500",
    primaryHover: "hover:from-blue-700 hover:to-cyan-600",
    section: "bg-gradient-to-br from-gray-50 to-blue-50",
  },
  borderRadius: {
    button: "rounded-full",
    card: "rounded-2xl",
  },
  shadows: {
    base: "shadow-lg",
    hover: "hover:shadow-xl",
  },
};

export default theme;
