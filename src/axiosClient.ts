import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "typescript-cookie";

// Create an Axios instance with a base URL
const axiosClient: AxiosInstance = axios.create({
  // baseURL: "http://193.203.161.90:8000/api",
  baseURL: "http://193.203.161.90:8000/api",
  // baseURL: "http://127.0.0.1:8005/api",
  withCredentials: false,
});

// Request interceptor to add Authorization header
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getCookie("VISION_ACCESS_TOKEN");
  if (token && config.headers && config.url !== "/login/" && config.url !=='/register/admin/') {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Don't remove from localStorage since we're using cookies
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
