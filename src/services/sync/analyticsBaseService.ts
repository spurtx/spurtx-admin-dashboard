import { ApiService, ReqConfig, PaginatedResponse } from "../../types/api";

export default function createAnalyticsBaseService({ api }: ApiService) {
  /**
   * Helper method to prepend 'analytics/' to endpoints
   */
  const getEndpoint = (endpoint: string) => `/analytics/${endpoint}`;

  /**
   * Common method for making GET requests with analytics prefix
   */
  const get = async <T>(endpoint: string, config?: ReqConfig): Promise<T> => {
    const response = await api.get(getEndpoint(endpoint), config);
    return response.data;
  };

  /**
   * Common method for filtered/paginated requests
   * Now properly typed for your nested PaginatedResponse structure
   */
  const getPaginated = async <T>(
    endpoint: string,
    filters: Record<string, any> = {},
    config?: ReqConfig
  ): Promise<PaginatedResponse & { data: { data: T[] } }> => {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      // Add other filter transformations as needed
    };

    const response = await api.get(getEndpoint(endpoint), {
      ...config,
      params,
    });

    return response.data;
  };

  return {
    get,
    getPaginated,
  };
}