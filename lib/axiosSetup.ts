// lib/axiosSetup.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://deploygrad.runasp.net";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Important if you're using cookies or auth
});

export default axiosInstance;
