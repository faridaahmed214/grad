// lib/axiosSetup.ts
import axios from "axios";

// Use environment variables or determine environment
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://deploygrad.runasp.net";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
