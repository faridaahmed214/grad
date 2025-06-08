import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import axiosInstance from "./axiosSetup";

interface ApiClientOptions {
  params?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
}

async function apiClient<T>(
  endpoint: string,
  { params = {}, method = "GET", data = null }: ApiClientOptions
): Promise<T | Error> {
  const session = await getSession();

  const requestConfig: AxiosRequestConfig = {
    method,
    url: endpoint,
    params: { ...axiosInstance.defaults.params, ...params },
    headers: {
      ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      "Content-Type": "application/json",
    },
    ...(method !== "GET" && { data }),
  };

  try {
    const response = await axiosInstance.request<T>(requestConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.response?.data?.message || "An error occurred");
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}

export default apiClient;
