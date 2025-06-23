import { ApiService, ReqConfig, PaginatedResponse } from "../../types/api";

// Define Proposal and ProposalFilters types
interface Subscription {
  id: string;
  amountPaid: number;
  autoRenewal: boolean;
  createdAt: string;
  deletedAt: string | null;
  duration: string;
  expiryDate: string;
  isActive: boolean;
  isCancelled: boolean;
  plan: string;
  transactionRef: string;
  updatedAt: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  userId: string;
}

interface SubscriptionFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
  createdBy?: string;
  // Add other filter options as needed
}

interface SubscriptionResponse extends PaginatedResponse {
  data: {
    data: Subscription[];  // Nested data array to match your PaginatedResponse structure
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
  FILTERED_SUBSCRIPTION: "/analytics/filter-subscription",
};

export default function createSubscriptionService({ api }: ApiService) {
  /**
   * Get paginated proposals with filtering options
   */
  const getFilteredSubscription = async (
    filters: SubscriptionFilters = {},
    config?: ReqConfig
  ): Promise<SubscriptionResponse> => {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.projectId && { 'filter.projectId': `$eq:${filters.projectId}` }),
      ...(filters.createdBy && { 'filter.createdBy': `$eq:${filters.createdBy}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await api.get(ENDPOINTS.FILTERED_SUBSCRIPTION, {
      ...config,
      params,
    });

    return response.data;
  };

  return {
    getFilteredSubscription,
  };
}