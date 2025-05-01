import { useQuery } from "@tanstack/react-query";
import createProjectService from "../../../services/sync/projectService";
import { useApi } from "../../useApi";
import type { ProjectMetrics } from "../../../types/sync.ts"; // Import your types

export const useProjectMetrics = () => {
    const { api } = useApi();
    const service = createProjectService({ api });
  
    return useQuery<ProjectMetrics, Error>({
      queryKey: ['project-metrics'],
      queryFn: () => service.getProjectMetrics(),
      // Callbacks moved here:
      meta: {
        onSuccess: (data: ProjectMetrics) => console.log('Metrics loaded:', data),
        onError: (error: Error) => console.error('Error loading metrics:', error)
      }
    });
  };