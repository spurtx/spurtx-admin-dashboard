
// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import { useToolkitClient } from "../useToolkitClient";
// import JobSeekersService, { 
//   JobSeeker, 
//   PaginatedJobSeekerResponse 
// } from "../../services/toolkit/jobSeekersService";

// interface JobSeekerFilters {
//   page?: number;
//   limit?: number;
//   status?: string;
//   minExperience?: number;
//   maxExperience?: number;
//   search?: string;
//   sortBy?: string;
//   location?: string;
//   skills?: string[];
// }

// interface UseJobSeekersDataOptions extends JobSeekerFilters {
//   queryOptions?: Omit<UseQueryOptions<PaginatedJobSeekerResponse, Error>, 'queryKey' | 'queryFn'>;
// }

// export const useJobSeekersData = ({
//   page = 1,
//   limit = 20,
//   status,
//   minExperience,
//   maxExperience,
//   search,
//   sortBy = "createdAt:DESC",
//   location,
//   skills,
//   queryOptions = {}
// }: UseJobSeekersDataOptions = {}) => {
//   useToolkitClient();

//   return useQuery<PaginatedJobSeekerResponse, Error>({
//     queryKey: [
//       'job-seekers-data', 
//       page, 
//       limit, 
//       status, 
//       minExperience, 
//       maxExperience, 
//       search, 
//       sortBy, 
//       location,
//       skills ? [...skills].sort().join(',') : ''
//     ],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Authentication token not found");
      
//       const response = await JobSeekersService.getJobSeekersForTable({
//         page,
//         limit,
//         status,
//         minExperience,
//         maxExperience,
//         search,
//         sortBy,
//         location,
//         skills
//       });

//       console.log('Job Seekers API Response:', response);
//       return response;
//     },
//     ...queryOptions
//   });
// };

// src/hooks/useJobSeekersData.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useToolkitClient } from "../useToolkitClient";
import JobSeekersService, { 
  
  PaginatedJobSeekerResponse,
  JobSeekerDetails
} from "../../services/toolkit/jobSeekersService";

interface JobSeekerFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

interface UseJobSeekersDataOptions extends JobSeekerFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedJobSeekerResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useJobSeekersData = ({
  page = 1,
  limit = 30,  // 30 items per page
  search,
  sortBy = "createdAt:DESC",
  queryOptions = {}
}: UseJobSeekersDataOptions = {}) => {
  useToolkitClient();

  return useQuery<PaginatedJobSeekerResponse, Error>({
    queryKey: ['job-seekers-data', page, limit, search, sortBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response =  await JobSeekersService.getJobSeekersForTable({
        page,
        limit,
        search,
        sortBy
      });
      console.log('Job Seekers API Response:', response);
      return response;
    },
    ...queryOptions
  });
};

// New hook for job seeker details
// export const useJobSeekerDetails = (userId: string) => {
//   useToolkitClient();

//   return useQuery<JobSeekerDetails, Error>({
//     queryKey: ['job-seeker-details', userId],
//     queryFn: async () => {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Authentication token not found");
      
//       return await JobSeekersService.getJobSeekerDetails(userId);
//     }
//   });
// };

export const useJobSeekerDetails = (userId: string) => {
  useToolkitClient();

  return useQuery<JobSeekerDetails, Error>({
    queryKey: ['job-seeker-details', userId],
    queryFn: async () => {
      console.log(`[useJobSeekerDetails] Fetching details for userId: ${userId}`);
      
      const token = localStorage.getItem("token");
      if (!token) {
        const errorMsg = "Authentication token not found";
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      try {
        console.log(`[useJobSeekerDetails] Calling service for userId: ${userId}`);
        const data = await JobSeekersService.getJobSeekerDetails(userId);
        
        // Log successful response structure
        console.groupCollapsed(`[useJobSeekerDetails] Successful response for userId: ${userId}`);
        console.log("Full response data:", data);
        
        // Log basic info
        console.log(`Job Seeker Name: ${data.name}`);
        console.log(`Application Count: ${data.applications?.length || 0}`);
        
        // Log first 3 applications if available
        if (data.applications && data.applications.length > 0) {
          console.log("Sample applications:");
          data.applications.slice(0, 3).forEach((app, i) => {
            console.log(`  App ${i+1}: ${app.company} - ${app.role} (${app.status})`);
          });
        }
        console.groupEnd();
        
        return data;
      } catch (error: any) {
        // Enhanced error logging
        console.group(`[useJobSeekerDetails] ERROR for userId: ${userId}`);
        console.error("Error details:", error);
        
        if (error.response) {
          // Axios error structure
          console.error("HTTP Status:", error.response.status);
          console.error("Response Data:", error.response.data);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request made but no response received:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Request setup error:", error.message);
        }
        
        console.groupEnd();
        
        // Throw a more informative error
        const errorMsg = error.response?.data?.message || 
                        error.message || 
                        "Unknown error occurred";
        throw new Error(`Failed to load job applications: ${errorMsg}`);
      }
    },
    // Optional: Add query options
    retry: 1,
    retryDelay: 1000
  });
};