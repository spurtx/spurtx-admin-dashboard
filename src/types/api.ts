
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ProjectStatus} from './sync';

export interface ApiService {
  api: AxiosInstance;
}

export type ReqConfig = AxiosRequestConfig;



export type Service = {
  api: AxiosInstance;
};

// Generic paginated response
// types/api.ts
export interface PaginatedResponse<T = any> {
  data: {
    data: T[];  // Note the nested data array
    links: {
      current: string;
      next?: string;
      last?: string;
    };
    meta: {
      currentPage: number;
      itemsPerPage: number;
      sortBy: string[];
      totalItems: number;
      totalPages: number;
    };
  };
}

// Filter interfaces
// export interface ProjectFilters {
//   page?: number;
//   limit?: number;
//   status?: ProjectStatus;
//   search?: string;
//   sortBy?: string;
//   [key: string]: any; // Allow additional filters
// }

// Project-specific filters
export interface ProjectFilters {
  page?: number;
  limit?: number;
  status?: ProjectStatus;
  scope?: string;
  level?: string;
  personnelNeeded?: string;
  search?: string;
  sortBy?: string;
}