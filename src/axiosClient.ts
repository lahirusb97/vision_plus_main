import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance with a base URL
const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

// Request interceptor to add Authorization header
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
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
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } else {
      console.error("Network error or no response:", error);
    }
    throw error;
  }
);

export default axiosClient;
