import { ApiService, ReqConfig, PaginatedResponse } from "../../types/api";

// Define Proposal and ProposalFilters types
interface Proposal {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'archived';
  projectId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  // Add other proposal properties as needed
}

interface ProposalFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
  createdBy?: string;
  // Add other filter options as needed
}

interface ProposalResponse extends PaginatedResponse {
  data: {
    data: Proposal[];  // Nested data array to match your PaginatedResponse structure
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
  FILTERED_PROPOSALS: "/analytics/filter-proposal",
};

export default function createProposalService({ api }: ApiService) {
  /**
   * Get paginated proposals with filtering options
   */
  const getFilteredProposals = async (
    filters: ProposalFilters = {},
    config?: ReqConfig
  ): Promise<ProposalResponse> => {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.projectId && { 'filter.projectId': `$eq:${filters.projectId}` }),
      ...(filters.createdBy && { 'filter.createdBy': `$eq:${filters.createdBy}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await api.get(ENDPOINTS.FILTERED_PROPOSALS, {
      ...config,
      params,
    });

    return response.data;
  };

  return {
    getFilteredProposals,
  };
}