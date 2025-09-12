// utils/api.js
import axios from "axios";
import { Platform } from "react-native";
import { getToken } from "./auth";

// Derive host without extra deps; for web use current hostname, otherwise fallback
const deriveHost = () => {
  if (Platform.OS === "web") {
    try {
      return (typeof window !== "undefined" && window.location && window.location.hostname) || "localhost";
    } catch {
      return "localhost";
    }
  }
  // Optional: allow override via env when running on device/emulator
  if (process.env.EXPO_PUBLIC_API_HOST) return process.env.EXPO_PUBLIC_API_HOST;
  return "localhost";
};

// Use explicit public URL if provided, else construct from host
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL
  ? process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '')
  : `http://${deriveHost()}:5000`;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers["x-auth-token"] = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  // Debug request
  try {
    // Keep logs concise to avoid PII
    console.log("API Request:", {
      method: config.method,
      url: config.baseURL + (config.url || ""),
      hasToken: Boolean(token),
    });
  } catch {}
  return config;
});

api.interceptors.response.use(
  (response) => {
    try {
      console.log("API Response:", {
        url: response.config?.baseURL + (response.config?.url || ""),
        status: response.status,
      });
    } catch {}
    return response;
  },
  (error) => {
    try {
      const cfg = error.config || {};
      console.log("API Error:", {
        url: cfg.baseURL + (cfg.url || ""),
        message: error?.response?.data?.msg || error?.message,
        status: error?.response?.status,
      });
    } catch {}
    return Promise.reject(error);
  }
);

export default api;
