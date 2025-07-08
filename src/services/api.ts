import { ApiService, ReqConfig } from "../types/api";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export function createApiService(baseURL: string): ApiService {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    api: instance, // Add missing api property
    get: <T>(url: string, config?: ReqConfig) => 
      instance.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),
    
    post: <T>(url: string, data?: any, config?: ReqConfig) => 
      instance.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),
    
    put: <T>(url: string, data?: any, config?: ReqConfig) => 
      instance.put<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),
    
    delete: <T>(url: string, config?: ReqConfig) => 
      instance.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data),
  };
}