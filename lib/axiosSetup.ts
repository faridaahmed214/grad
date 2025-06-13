// lib/axiosSetup.ts
import axios from "axios";

// Fallback URL to ensure baseURL is always defined
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://deploygrad.runasp.net";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // Only use withCredentials in development if API supports it
  withCredentials: process.env.NODE_ENV === "development",
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Optional: log outgoing requests during development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Axios] Request: ${config.method?.toUpperCase()} ${config.url}`, config);
    }
    return config;
  },
  (error) => {
    console.error("[Axios] Request Error:", error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error";

    console.error("[Axios] Response Error:", message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
