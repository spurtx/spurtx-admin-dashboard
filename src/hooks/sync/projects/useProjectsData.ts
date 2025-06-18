// // // hooks/sync/projects/useProjectsData.ts
// // import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// // import createProjectService from "../../../services/sync/projectService";
// // import { useApi } from "../../useApi";
// // import { Project, ProjectsResponse, ProjectStatus } from "../../../types/sync";

// // interface UseProjectsDataOptions {
// //   page?: number;
// //   limit?: number;
// //   status?: ProjectStatus; // Use enum instead of string
// //   search?: string;
// //   queryOptions?: Omit<UseQueryOptions<ProjectsResponse, Error>, 'queryKey' | 'queryFn'>;
// // }

// // export const useProjectsData = ({
// //   page = 1,
// //   limit = 20,
// //   status,
// //   search,
// //   queryOptions = {}
// // }: UseProjectsDataOptions = {}) => {
// //   const { api } = useApi();
// //   const service = createProjectService({ api });

// //   return useQuery<ProjectsResponse, Error>({
// //     queryKey: ['projects-data', page, limit, status, search],
// //     queryFn: async () => {
// //       const token = localStorage.getItem("token");
// //       const response = await service.getFilteredProjects(
// //         { 
// //           page, 
// //           limit, 
// //           status: status as string, // Cast to string for API call
// //           search 
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );
// //       return response;
// //     },
// //     ...queryOptions,
// //     // Type-safe way to include keepPreviousData
// //     keepPreviousData: queryOptions.keepPreviousData ?? true
// //   });
// // };

// // hooks/sync/projects/useProjectsData.ts
// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import createProjectService from "../../../services/sync/projectService";
// import { useApi } from "../../useApi";
// import { Project, ProjectStatus } from "../../../types/sync";
// import { PaginatedResponse, ProjectFilters } from "../../../types/api";

// interface UseProjectsDataOptions extends ProjectFilters {
//   queryOptions?: Omit<UseQueryOptions<PaginatedResponse<Project>, Error>, 'queryKey' | 'queryFn'>;
// }

// export const useProjectsData = ({
//   page = 1,
//   limit = 20,
//   status,
//   search,
//   sortBy = "createdAt:DESC",
//   queryOptions = {}
// }: UseProjectsDataOptions = {}) => {
//   const { api } = useApi();
//   const service = createProjectService({ api });

//   return useQuery<PaginatedResponse<Project>, Error>({
//     queryKey: ['projects-data', page, limit, status, search, sortBy],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Authentication token not found");
      
//       return service.getFilteredProjects(
//         { page, limit, status, search, sortBy },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//     },
//     ...queryOptions,
//     // keepPreviousData: true
//   });
// };

// hooks/sync/projects/useProjectsData.ts
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