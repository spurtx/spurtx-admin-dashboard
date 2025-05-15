import { useQuery } from "@tanstack/react-query";
import createProjectService from "../../../services/sync/projectService";
import { useApi } from "../../useApi";

export const useProjectMetrics = () => {
  const { api } = useApi();
  const service = createProjectService({ api });

  return useQuery<number, Error>({
    queryKey: ['project-metrics'],
    queryFn: async () => {
      const response = await service.getFilteredProjects();
      return response.meta.totalItems; // ✅ only return the count
    },
    meta: {
      onSuccess: (count: number) => console.log('Total projects:', count),
      onError: (error: Error) => console.error('Error loading metrics:', error)
    }
  });
};
