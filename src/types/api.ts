// import { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { 
//   // User, 
//   // Project, 
//   // Proposal, 
//   // Milestone, 
//   // Task,
//   ProjectStatus,
//   ProjectProposalStatus,
//   // SubscriptionPlan
// } from './sync';

// // Core service configuration
// export interface ApiService {
//   api: AxiosInstance;
// }

// export type ReqConfig = AxiosRequestConfig;

// export type Service = {
//   api: AxiosInstance;
// };

// // Paginated response type
// export interface PaginatedResponse<T> {
//   data: T[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// }

// // Extended types for specific endpoints
// export interface ProjectFilters {
//   status?: ProjectStatus;
//   search?: string;
//   ownerId?: string;
// }

// export interface ProposalFilters {
//   status?: ProjectProposalStatus;
//   projectId?: string;
// }

// types/api.ts
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ProjectStatus, Project} from './sync';

export interface ApiService {
  api: AxiosInstance;
}

export type ReqConfig = AxiosRequestConfig;

// Generic paginated response
// types/api.ts
export interface PaginatedResponse {
  data: {
    data: Project[];  // Note the nested data array
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