import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: "/",
  timeout: 5000,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
  const existingHeaders = config.headers ?? {};

  config.headers = {
    Accept: "application/json",
    ...existingHeaders,
  } as InternalAxiosRequestConfig["headers"];

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as InternalAxiosRequestConfig["headers"];
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data ?? error);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
