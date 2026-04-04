import axios from "axios";

// 🔥 Create Axios Instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://collex-soeo.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧠 REQUEST INTERCEPTOR (Attach Token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 RESPONSE INTERCEPTOR (Handle Errors Globally)
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    // 🔴 Unauthorized (Token expired / invalid)
    if (status === 401) {
      console.warn("Unauthorized! Logging out...");

      localStorage.removeItem("token");

      // Optional: redirect to login
      window.location.href = "/login";
    }

    // 🔴 Server Error
    if (status === 500) {
      console.error("Server Error! Please try again later.");
    }

    // 🔴 Network Error
    if (!error.response) {
      console.error("Network Error! Check your internet.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;