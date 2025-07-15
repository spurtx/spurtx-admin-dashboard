
import { ApiService, ReqConfig, PaginatedResponse } from "../../types/api";

// Define Milestone and MilestoneFilters types inline since they're not in sync types
interface Milestone {
  id: string;
  name: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  projectId: string;
  // Add other milestone properties as needed
}

interface MilestoneFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
  // Add other filter options as needed
}

interface MilestoneResponse extends PaginatedResponse {
  data: {
    data: Milestone[];  // Nested data array to match your PaginatedResponse structure
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


const ENDPOINTS = {
  FILTERED_MILESTONES: "/analytics/filter-milestone",
};

export default function createMilestoneService({ api }: ApiService) {
  /**
   * Get paginated milestones with filtering options
   */
  const getFilteredMilestones = async (
    filters: MilestoneFilters = {},
    config?: ReqConfig
  ): Promise<MilestoneResponse> => {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.projectId && { 'filter.projectId': `$eq:${filters.projectId}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await api.get(ENDPOINTS.FILTERED_MILESTONES, {
      ...config,
      params,
    });

    return response.data;
  };

  return {
    getFilteredMilestones,
  };
}