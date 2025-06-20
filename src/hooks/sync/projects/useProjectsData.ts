
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import createProjectService from "../../../services/sync/projectService";
import { useApi } from "../../useApi";
import { PaginatedResponse, ProjectFilters } from "../../../types/api";

interface UseProjectsDataOptions extends ProjectFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useProjectsData = ({
  page = 1,
  limit = 20,
  status,
  search,
  sortBy = "createdAt:DESC",
  queryOptions = {}
}: UseProjectsDataOptions = {}) => {
  const { api } = useApi();
  const service = createProjectService({ api });

  return useQuery<PaginatedResponse, Error>({
    queryKey: ['projects-data', page, limit, status, search, sortBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response = await service.getFilteredProjects(
        { page, limit, status, search, sortBy },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('API Response:', response.data);
      return response;
    
    },
    ...queryOptions
  });
};