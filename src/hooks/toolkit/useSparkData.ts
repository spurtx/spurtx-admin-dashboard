import { PaginatedSparkResponse} from './../../services/toolkit/sparkService';
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import SparkService from "../../services/toolkit/sparkService"; // Import Spark types
import { useToolkitClient } from "../useToolkitClient";


interface SparkFilters {
  page?: number;
  limit?: number;
  status?: string;
  minPowerLevel?: number;
  search?: string;
  sortBy?: string;
}

interface UseSparkDataOptions extends SparkFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedSparkResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useSparkData = ({
  page = 1,
  limit = 20,
  status,
  minPowerLevel,
  search,
  sortBy = "createdAt:DESC",
  queryOptions = {}
}: UseSparkDataOptions = {}) => {
  // Remove unused client destructuring
  useToolkitClient(); // This ensures the client is initialized

  return useQuery<PaginatedSparkResponse, Error>({
    queryKey: ['sparks-data', page, limit, status, minPowerLevel, search, sortBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response = await SparkService.getSparksForTable(
        { page, limit, status, minPowerLevel, search, sortBy }
      );

      console.log('Spark API Response:', response);
      return response;
    },
    ...queryOptions
  });
};