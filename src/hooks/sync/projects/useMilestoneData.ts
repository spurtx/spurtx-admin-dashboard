import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import createMilestoneService from "../../../services/sync/milestoneService";
import { useApi } from "../../useApi";
import { PaginatedResponse } from "../../../types/api";

interface MilestoneFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
}

interface UseMilestonesDataOptions extends MilestoneFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useMilestonesData = ({
  page = 1,
  limit = 20,
  status,
  projectId,
  search,
  sortBy = "dueDate:ASC", // Default sort by due date ascending
  queryOptions = {}
}: UseMilestonesDataOptions = {}) => {
  const { api } = useApi();
  const service = createMilestoneService({ api });

  return useQuery<PaginatedResponse, Error>({
    queryKey: ['milestones-data', page, limit, status, projectId, search, sortBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response = await service.getFilteredMilestones(
        { page, limit, status, projectId, search, sortBy },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Milestones API Response:', response.data);
      return response;
    },
    ...queryOptions
  });
};