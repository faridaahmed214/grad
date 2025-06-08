// lib/axiosSetup.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://deploygrad.runasp.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
