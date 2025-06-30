
import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

export interface JobSeeker {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country?: string | null;
  gender?: string | null;
  name: string; // Computed property
  location: string; // Computed property
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  jobType: string;
  employmentType: string;
  salary: string;
  status: "accepted" | "rejected" | "pending";
  appliedAt: string;
}

export interface JobSeekerDetails extends JobSeeker {
  applications: JobApplication[];
}

// Updated response structure
export interface PaginatedJobSeekerResponse {
  status: string;
  message: string;
  data: {
    jobSeekers: JobSeeker[];
    pageMetaDto: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
}

interface JobSeekerFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

const ENDPOINT = "/admin/jobseekers";

const JobSeekersService = {
  async getJobSeekersForTable(
    filters: JobSeekerFilters = {},
    config?: AxiosRequestConfig
  ): Promise<PaginatedJobSeekerResponse> {
    const params: Record<string, any> = {
      page: filters.page || 1,
      limit: filters.limit || 30, // 30 items per page
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params,
    });

    // Map API response to our structure
    const jobSeekers = response.data.data.jobSeekers.map((js: any) => ({
      ...js,
      name: `${js.firstName} ${js.lastName}`,
      location: js.country || "Unknown",
    }));

    return {
      ...response.data,
      data: {
        jobSeekers,
        pageMetaDto: response.data.data.pageMetaDto
      }
    };
  },

//   async getJobSeekerDetails(
//     jobSeekerId: string,
//     config?: AxiosRequestConfig
//   ): Promise<JobSeekerDetails> {
//     const response = await toolkitClient.get(`${ENDPOINT}/applications/${jobSeekerId}`, config);
    
//     // Mock applications data - replace with actual API data
//     const applications: JobApplication[] = [
//       {
//         id: "1",
//         company: "TechNova Inc.",
//         role: "Software Engineer",
//         jobType: "Full-time",
//         employmentType: "Permanent",
//         salary: "$85,000",
//         status: "accepted",
//         appliedAt: "2025-01-15T10:30:00Z"
//       },
//       {
//         id: "2",
//         company: "DataWorks Ltd",
//         role: "Data Analyst",
//         jobType: "Contract",
//         employmentType: "Temporary",
//         salary: "$75,000",
//         status: "pending",
//         appliedAt: "2025-02-20T14:45:00Z"
//       }
//     ];
    
//     return {
//       ...response.data.data,
//       name: `${response.data.data.firstName} ${response.data.data.lastName}`,
//       location: response.data.data.country || "Unknown",
//       applications
//     };
//   }
// };

// export default JobSeekersService;

// JobSeekersService.ts
// JobSeekersService.ts
async getJobSeekerDetails(
  userId: string,
  config?: AxiosRequestConfig
): Promise<JobSeekerDetails> {
  try {
    const response = await toolkitClient.get(`${ENDPOINT}/applications/${userId}`, config);
    
    // Log the actual API response for debugging
    console.log("Job Seeker Details API Response:", response.data);
    
    // Ensure we have the expected data structure
    if (!response.data || !response.data.data) {
      throw new Error("Invalid API response structure");
    }
    
    const apiData = response.data.data;
    
    // Safely handle applications array
    const applications = Array.isArray(apiData.applications) 
      ? apiData.applications.map((app: any) => ({
          id: app.id,
          company: app.companyName || "N/A",
          role: app.position || "N/A",
          jobType: app.jobType || "N/A",
          employmentType: app.employmentType || "N/A",
          salary: app.salary ? `$${app.salary}` : "N/A",
          status: app.status?.toLowerCase() || "pending",
          appliedAt: app.createdAt || new Date().toISOString()
        }))
      : []; // Default to empty array if applications is missing
    
    return {
      ...apiData,
      name: `${apiData.firstName} ${apiData.lastName}`,
      location: apiData.country || "Unknown",
      applications // Use the safely created applications array
    };
  } catch (error) {
    console.error("Error fetching job seeker details:", error);
    throw error;
  }
}

};

export default JobSeekersService;