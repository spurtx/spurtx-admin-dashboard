import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-api.com";


export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
   "Content-Type": "application/json",
   "api-key": import.meta.env.VITE_API_KEY ?? "",
   // authorization header to be added later
//   Accept: "application/json",
//   Authorization: `Bearer ${token}`
  },
});


// Response interceptor
// api.interceptors.response.use(
//     (res) => res.data,
//     (error) => {
//       console.error("API Error:", error.response ?? error.message);
//       const message =
//         error?.response?.data?.message || "An unexpected error occurred";
//       return Promise.reject(message);
//     }
//   );
  
//   // Request interceptor - Attach token from localStorage or state
//   api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });