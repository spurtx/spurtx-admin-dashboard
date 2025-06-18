// import { ApiService, ReqConfig } from "../../types/api.ts";
// import { Project, ProjectStatus } from "../../types/sync.ts";

// interface ProjectFilters {
//   page?: number;
//   limit?: number;
//   status?: ProjectStatus;
//   scope?: string;
//   level?: string; 
//   personnelNeeded?: string;
//   search?: string; 
// }

// interface ProjectsResponse {
//   data: Project[];
//   meta: {
//     totalItems: number;
//     itemsPerPage: number;
//     currentPage: number;
//     totalPages: number;
//   };
// }

// interface ProjectMetrics {
//   totalProjects: number;
//   totalInvitationsSent: number;
//   avgTeamMembers: number;
//   avgMembersRemoved: number;
//   avgCompletionDays: number;
// }

// interface ProjectsByStatus {
//   [ProjectStatus.DRAFT]: number;
//   [ProjectStatus.IN_PROGRESS]: number;
//   [ProjectStatus.COMPLETED]: number;
//   // Add other statuses as needed
// }

// // export default function createProjectService({ api }: ApiService) {
// // const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // const API_PREFIX = "/analytics";

// //   const ENDPOINTS = {
// //     TOTAL_PROJECT: "/filter-project",
// //     // PROJECT_METRICS: "/projects/member-projects",
// //     // PROJECTS_BY_STATUS: "/projects/project-progress",
// //   };

// //   /**
// //    * Get filtered projects with pagination
// //    */
// //   const getFilteredProjects = async (
// //     filters: ProjectFilters = {},
// //     config?: ReqConfig
// //   ): Promise<ProjectsResponse> => {
// //     const params = new URLSearchParams();

// //     // Required params
// //     params.append("page", String(filters.page || 1));

// //     // Optional filters
// //     if (filters.status) params.append("filter.status", `$eq:${filters.status}`);
// //     if (filters.scope) params.append("filter.scope", `$eq:${filters.scope}`);
// //     if (filters.level) params.append("filter.experienceLevel", `$eq:${filters.level}`);
// //     if (filters.personnelNeeded) {
// //       params.append("filter.personnelNeeded", `$eq:${filters.personnelNeeded}`);
// //     }
// //     if (filters.search) params.append("search", filters.search);
// //     if (filters.limit) params.append("limit", String(filters.limit));

// //     const response = await api.get(
// //       `${BASE_URL}${API_PREFIX}`,
// //       { ...config, params }
// //     );

// //     return response.data;
// //   };

// //   /**
// //    * Get dashboard metrics
// //    */
// //   const getProjectMetrics = async (
// //     config?: ReqConfig
// //   ): Promise<ProjectMetrics> => {
// //     const response = await api.get(
// //       `${API_PREFIX}${ENDPOINTS.PROJECT_METRICS}`,
// //       config
// //     );
// //     return response.data;
// //   };

// //   /**
// //    * Get projects count by status
// //    */
// //   const getProjectsByStatus = async (
// //     config?: ReqConfig
// //   ): Promise<ProjectsByStatus> => {
// //     const response = await api.get(
// //       `${API_PREFIX}${ENDPOINTS.PROJECTS_BY_STATUS}`,
// //       config
// //     );
// //     return response.data;
// //   };

// //   return {
// //     getFilteredProjects,
// //     getProjectMetrics,
// //     getProjectsByStatus,
// //   };
// // }


// export default function createProjectService({ api }: ApiService) {
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const API_PREFIX = "/analytics";

//   const ENDPOINTS = {
//     TOTAL_PROJECT: "/filter-project",
//     PROJECT_METRICS: "/projects/member-projects",
//     PROJECTS_BY_STATUS: "/projects/project-progress",
//   };

//   const buildUrl = (endpoint: string) => `${BASE_URL}${API_PREFIX}${endpoint}`;

//   /**
//    * Get filtered projects with pagination
//    */
//   const getFilteredProjects = async (
//     filters: ProjectFilters = {},
//     config?: ReqConfig
//   ): Promise<ProjectsResponse> => {
//     const params = new URLSearchParams();

//     params.append("page", String(filters.page || 1));
//     if (filters.status) params.append("filter.status", `$eq:${filters.status}`);
//     if (filters.scope) params.append("filter.scope", `$eq:${filters.scope}`);
//     if (filters.level) params.append("filter.experienceLevel", `$eq:${filters.level}`);
//     if (filters.personnelNeeded) {
//       params.append("filter.personnelNeeded", `$eq:${filters.personnelNeeded}`);
//     }
//     if (filters.search) params.append("search", filters.search);
//     if (filters.limit) params.append("limit", String(filters.limit));

//     const response = await api.get(buildUrl(ENDPOINTS.TOTAL_PROJECT), {
//       ...config,
//       params,
//     });

//     return response.data;
//   };

//   /**
//    * Get dashboard metrics
//    */
//   const getProjectMetrics = async (
//     config?: ReqConfig
//   ): Promise<ProjectMetrics> => {
//     const response = await api.get(buildUrl(ENDPOINTS.PROJECT_METRICS), config);
//     return response.data;
//   };

//   /**
//    * Get projects count by status
//    */
//   const getProjectsByStatus = async (
//     config?: ReqConfig
//   ): Promise<ProjectsByStatus> => {
//     const response = await api.get(buildUrl(ENDPOINTS.PROJECTS_BY_STATUS), config);
//     return response.data;
//   };

//   return {
//     getFilteredProjects,
//     getProjectMetrics,
//     getProjectsByStatus,
//   };
// }

// src/services/sync/projectService.ts

// import { ApiService, ReqConfig } from "../../types/api";
// import { Project, ProjectStatus } from "../../types/sync";

// interface ProjectFilters {
//   page?: number;
//   limit?: number;
//   status?: ProjectStatus;
//   scope?: string;
//   level?: string;
//   personnelNeeded?: string;
//   search?: string;
// }

// interface ProjectsResponse {
//   data: Project[];
//   meta: {
//     totalItems: number;
//     itemsPerPage: number;
//     currentPage: number;
//     totalPages: number;
//   };
// }

// interface ProjectMetrics {
//   totalProjects: number;
//   totalInvitationsSent: number;
//   avgTeamMembers: number;
//   avgMembersRemoved: number;
//   avgCompletionDays: number;
// }

// interface ProjectsByStatus {
//   [ProjectStatus.DRAFT]?: number;
//   [ProjectStatus.IN_PROGRESS]?: number;
//   [ProjectStatus.COMPLETED]?: number;
//   // Extend with other statuses if needed
// }

// export default function createProjectService({ api }: ApiService) {
//   const ENDPOINTS = {
//     FILTERED_PROJECTS: "/analytics/filter-project",
//     PROJECT_METRICS: "/analytics/projects/member-projects",
//     PROJECTS_BY_STATUS: "/analytics/projects/project-progress",
//   };

//   const getFilteredProjects = async (
//     filters: ProjectFilters = {},
//     config?: ReqConfig
//   ): Promise<ProjectsResponse> => {
//     const params = new URLSearchParams();

//     params.append("page", String(filters.page || 1));
//     if (filters.status) params.append("filter.status", `$eq:${filters.status}`);
//     if (filters.scope) params.append("filter.scope", `$eq:${filters.scope}`);
//     if (filters.level) params.append("filter.experienceLevel", `$eq:${filters.level}`);
//     if (filters.personnelNeeded) {
//       params.append("filter.personnelNeeded", `$eq:${filters.personnelNeeded}`);
//     }
//     if (filters.search) params.append("search", filters.search);
//     if (filters.limit) params.append("limit", String(filters.limit));

//     const response = await api.get(ENDPOINTS.FILTERED_PROJECTS, {
//       ...config,
//       params,
//     });

//     return response.data;
//   };

//   const getProjectMetrics = async (
//     config?: ReqConfig
//   ): Promise<ProjectMetrics> => {
//     const response = await api.get(ENDPOINTS.PROJECT_METRICS, config);
//     return response.data;
//   };

//   const getProjectsByStatus = async (
//     config?: ReqConfig
//   ): Promise<ProjectsByStatus> => {
//     const response = await api.get(ENDPOINTS.PROJECTS_BY_STATUS, config);
//     return response.data;
//   };

//   return {
//     getFilteredProjects,
//     getProjectMetrics,
//     getProjectsByStatus,
//   };
// }

// services/sync/projectService.ts
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
  ): Promise<PaginatedResponse<Project>> => {
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
