// import { useQuery } from "@tanstack/react-query";
// import createProjectService from "../../../services/sync/projectService";
// import { useApi } from "../../useApi";

// export const useProjectMetrics = () => {
//   const { api } = useApi();
//   const service = createProjectService({ api });

//   const token = localStorage.getItem("token");

//   return useQuery<number, Error>({
//     queryKey: ['project-metrics'],
//     queryFn: async () => {
//       // const response = await service.getFilteredProjects();
//       const response = await service.getFilteredProjects({}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("full data response", response);
//       return response.meta.totalItems; 
//     },
//     meta: {
//       onSuccess: (count: number) => console.log('Total projects:', count),
//       onError: (error: Error) => console.error('Error loading metrics:', error)
//     }
//   });
// };



