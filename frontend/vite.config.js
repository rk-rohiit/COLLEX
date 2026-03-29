import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Base URL (important for deployment)
  base: "/", 
  // 👉 change this if deploying to subfolder
  // example: base: "/collex/"

  // ✅ Path alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});