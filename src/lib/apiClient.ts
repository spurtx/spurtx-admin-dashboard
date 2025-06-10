import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.com";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "api-key": import.meta.env.VITE_API_KEY ?? "",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      // `config.headers` is of type AxiosHeaders or undefined
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else if (config.headers) {
        // fallback: convert to AxiosHeaders if it's a plain object
        config.headers = new AxiosHeaders(config.headers);
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({ Authorization: `Bearer ${token}` });
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor (unchanged)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("API Error:", error.response ?? error.message);
    const message =
      (error.response && (error.response.data as any)?.message) ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);
