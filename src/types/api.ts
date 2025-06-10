import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { 
  // User, 
  // Project, 
  // Proposal, 
  // Milestone, 
  // Task,
  ProjectStatus,
  ProjectProposalStatus,
  // SubscriptionPlan
} from './sync';

// Core service configuration
export interface ApiService {
  api: AxiosInstance;
}

export type ReqConfig = AxiosRequestConfig;

export type Service = {
  api: AxiosInstance;
};

// Paginated response type
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Extended types for specific endpoints
export interface ProjectFilters {
  status?: ProjectStatus;
  search?: string;
  ownerId?: string;
}

export interface ProposalFilters {
  status?: ProjectProposalStatus;
  projectId?: string;
}