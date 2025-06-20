
import { ApiService, ReqConfig, PaginatedResponse, ProjectFilters } from "../../types/api";
import { Project, ProjectMetrics, ProjectsByStatus } from "../../types/sync";

const ENDPOINTS = {
  FILTERED_PROJECTS: "/analytics/filter-project",
  PROJECT_METRICS: "/analytics/projects/member-projects",
  PROJECTS_BY_STATUS: "/analytics/projects/project-progress",
};

export default function createProjectService({ api }: ApiService) {
  /**
   * Get paginated projects with filtering options
   */
  const getFilteredProjects = async (
    filters: ProjectFilters = {},
    config?: ReqConfig
  ): Promise<PaginatedResponse> => {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.scope && { 'filter.scope': `$eq:${filters.scope}` }),
      ...(filters.level && { 'filter.experienceLevel': `$eq:${filters.level}` }),
      ...(filters.personnelNeeded && { 'filter.personnelNeeded': `$eq:${filters.personnelNeeded}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await api.get(ENDPOINTS.FILTERED_PROJECTS, {
      ...config,
      params,
    });

    return response.data;
  };

  /**
   * Get project metrics dashboard data
   */
  const getProjectMetrics = async (
    config?: ReqConfig
  ): Promise<ProjectMetrics> => {
    const response = await api.get(ENDPOINTS.PROJECT_METRICS, config);
    return response.data;
  };

  /**
   * Get project counts grouped by status
   */
  const getProjectsByStatus = async (
    config?: ReqConfig
  ): Promise<ProjectsByStatus> => {
    const response = await api.get(ENDPOINTS.PROJECTS_BY_STATUS, config);
    return response.data;
  };

  return {
    getFilteredProjects,
    getProjectMetrics,
    getProjectsByStatus,
  };
}
