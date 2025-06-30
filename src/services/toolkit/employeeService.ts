import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

// Types
export interface Employee {
  id: string;
  companyName: string;
  address: string | null;
  bio: string | null;
  email: string;
  employeeCount: number;
  employeeSize: string;
  industry: string;
  logo: string | null;
  services: Array<{
    active: boolean;
    createdAt: string;
    id: string;
    interval: string;
    name: string;
    nextSubscriptionAmount: number | null;
    subscriptionEnd: string | null;
    subscriptionId: string | null;
    trialExpires: string;
    updatedAt: string;
  }>;
  subdomain: string;
  subscriptionType: string;
  website: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedEmployeeResponse {
  status: string;
  message: string;
  data: {
    companies: Employee[];
    pagination: {
      total: number;
      page: number;
      pages: number;
      limit: number;
    };
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

// export interface PaginatedEmployeeResponse {
//   data: Employee[];
//   links: {
//     current: string;
//     next?: string;
//     last?: string;
//   };
//   meta: {
//     currentPage: number;
//     itemsPerPage: number;
//     sortBy: string[];
//     totalItems: number;
//     totalPages: number;
//   };
// }

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
