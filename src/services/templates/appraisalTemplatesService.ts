import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

// Define parameter types
export type SearchParamsType = {
  page?: number;
  take: number;
  searchQuery?: string;
};

type ReqConfig = AxiosRequestConfig;

// Example response data shape - replace with your actual response structure
export type SurveyTemplate = {
  id: string;
  name: string;
  // Add other fields here
};

export type AppraisalTemplateResponse = {
  data: SurveyTemplate[];
  total: number;
  page: number;
  searchQuery?: string;
};

const prefix = "/spur";

const appraisalTemplatesService = {
  // Create a new survey template
  createAppraisalTemplate: async (data: unknown, reqConfig?: ReqConfig) => {
    const response = await toolkitClient.post(
      `${prefix}/appraisal/template`,
      data,
      reqConfig
    );
    return response.data;
  },

  // Get survey templates (returns just .data, not AxiosResponse)
  getAppraisalTemplates: async (
    params: SearchParamsType,
    reqConfig?: ReqConfig
  ): Promise<AppraisalTemplateResponse> => {
    const { page, take, searchQuery } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("take", take.toString());
    if (page) queryParams.append("page", page.toString());
    if (searchQuery) queryParams.append("searchQuery", searchQuery);

    const response = await toolkitClient.get(
      `${prefix}/appraisal/admin/template?${queryParams.toString()}`,
      reqConfig
    );

    return response.data; 
  },

  // Delete a survey template
  deleteAppraisalTemplate: async (id: string, reqConfig?: ReqConfig) => {
    const response = await toolkitClient.delete(
      `${prefix}/appraisal/template/${id}`,
      reqConfig
    );
    return response.data;
  },
};

export default appraisalTemplatesService;
