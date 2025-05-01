import { apiClient } from "../lib/apiClient.ts";

export const useApi = () => {
    // Add any additional runtime configuration here if needed
    const setAuthToken = (token: string) => {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };
  
    const clearAuthToken = () => {
      delete apiClient.defaults.headers.common['Authorization'];
    };
  
    return {
      api: apiClient,
      setAuthToken,
      clearAuthToken
    };
  };