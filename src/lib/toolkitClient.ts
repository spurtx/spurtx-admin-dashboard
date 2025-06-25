import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from "axios";

const BASE_URL = import.meta.env.VITE_TOOLKIT_BASE_URL || "https://your-api.com";

export const toolkitClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
    "api-key": import.meta.env.VITE_API_KEY ?? "",
  }),
});

// Update request interceptor
toolkitClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    const headers = config.headers ? new AxiosHeaders(config.headers) : new AxiosHeaders();

    if (token) {
      headers.set("X-Access-Token", token); // ✅ correct header
    }

    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      headers.set("api-key", apiKey);
    }

    return {
      ...config,
      headers,
    };
  },
  (error: AxiosError) => {
    console.error("Request Error:", error.message);
    return Promise.reject(error);
  }
);


// Response interceptor with enhanced error handling
toolkitClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let errorMessage = "An unexpected error occurred";
    
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          errorMessage = "Unauthorized access to toolkit";
          // Add token refresh logic here if needed
          break;
        case 403:
          errorMessage = "Forbidden resource requested";
          break;
        case 429:
          errorMessage = "Too many requests to toolkit API";
          break;
        default:
          errorMessage = (error.response.data as any)?.message || 
                         `Toolkit API Error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = "No response received from toolkit server";
    } else {
      errorMessage = error.message;
    }

    console.error("Toolkit API Error:", {
      message: errorMessage,
      config: error.config,
      code: error.code
    });

    return Promise.reject(new Error(errorMessage));
  }
);

// Optional: Add API timeout handling
// const TIMEOUT = 30000;
// toolkitClient.defaults.timeout = TIMEOUT;