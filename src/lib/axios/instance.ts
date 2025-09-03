// src/lib/axios/instance.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const getBaseURL = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) return `${process.env.NEXT_PUBLIC_API_URL}/api`;
  if (typeof window !== "undefined") return `${window.location.origin}/api`;
  return "http://localhost:3000/api";
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token) {
      // Axios v1 headers are AxiosHeaders; prefer .set when available
      if (typeof (config.headers as any).set === "function") {
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = {
          ...(config.headers as Record<string, string>),
          Authorization: `Bearer ${token}`,
        } as any;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle 401 globally if needed
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
