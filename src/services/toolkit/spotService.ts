// src/services/sparkService.ts
import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

// Define types within the service file
export interface Spot {
  id: string;
  name: string;
  description: string;
  powerLevel: number;
  type?: string;           // Add this
  department?: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

interface SpotFilters {
  page?: number;
  limit?: number;
  status?: string;
  minPowerLevel?: number;
  search?: string;
  sortBy?: string;
}

export interface PaginatedSpotResponse {
  data: Spot[];
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
}

const ENDPOINT = "/admin/spark";

const SpotService = {
  /**
   * Get paginated sparks for table display
   */
  async getSpotForTable(
    filters: SpotFilters = {},
    config?: AxiosRequestConfig
  ): Promise<PaginatedSpotResponse> {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 25,  // Default to 25 items per page for tables
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.minPowerLevel && { 'filter.powerLevel': `$gte:${filters.minPowerLevel}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params,
    });

    return response.data;
  },

  /**
   * Get all sparks without pagination (if needed for dropdowns)
   */
  async getAllSpot(config?: AxiosRequestConfig): Promise<Spot[]> {
    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params: { limit: 1000 }  // Adjust based on expected maximum
    });
    return response.data.data;  // Assuming same response structure
  }
};

export default SpotService