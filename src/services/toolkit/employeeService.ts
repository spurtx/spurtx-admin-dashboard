import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

// Types
export interface Employee {
  id: string;
  name: string;
  description: string;
  powerLevel: number;
  departments: number;       // Add this
  emoCount: number;          // Add this
  additions: number;         // Add this
  rejections: number;
  type?: string;
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

interface EmployeeFilters {
  page?: number;
  take?: number; // align with backend param
  status?: string;
  minPowerLevel?: number;
  search?: string;
  sortBy?: string;
}

export interface PaginatedEmployeeResponse {
  data: Employee[];
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

const ENDPOINT = "/admin/companies";

const EmployeeService = {
  async getEmployeesForTable(
    filters: EmployeeFilters = {},
    config?: AxiosRequestConfig
  ): Promise<PaginatedEmployeeResponse> {
    const params = {
      page: filters.page || 1,
      take: filters.take || 25, // changed to `take` for backend compatibility
      ...(filters.status && { "filter.status": `$eq:${filters.status}` }),
      ...(filters.minPowerLevel && {
        "filter.powerLevel": `$gte:${filters.minPowerLevel}`,
      }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params,
    });

    return response.data;
  },

  async getAllEmployees(config?: AxiosRequestConfig): Promise<Employee[]> {
    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params: { take: 1000 },
    });
    return response.data.data;
  },
};

export default EmployeeService;
