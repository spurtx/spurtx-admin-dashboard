import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import EmployeeService, {
  PaginatedEmployeeResponse,
} from "../../services/toolkit/employeeService";
import { useToolkitClient } from "../useToolkitClient";

interface EmployeeFilters {
  page?: number;
  take?: number;
  status?: string;
  minPowerLevel?: number;
  search?: string;
  sortBy?: string;
}

interface UseEmployeeDataOptions extends EmployeeFilters {
  queryOptions?: Omit<
    UseQueryOptions<PaginatedEmployeeResponse, Error>,
    "queryKey" | "queryFn"
  >;
}

export const useEmployeeData = ({
  page = 1,
  take = 20,
  status,
  minPowerLevel,
  search,
  sortBy = "createdAt:DESC",
  queryOptions = {},
}: UseEmployeeDataOptions = {}) => {
  useToolkitClient(); // Ensure axios client is initialized

  return useQuery<PaginatedEmployeeResponse, Error>({
    queryKey: [
      "employees-data",
      page,
      take,
      status,
      minPowerLevel,
      search,
      sortBy,
    ],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await EmployeeService.getEmployeesForTable({
        page,
        take,
        status,
        minPowerLevel,
        search,
        sortBy,
      });

      console.log("Employee API Response:", response);
      return response;
    },
    ...queryOptions,
  });
};
