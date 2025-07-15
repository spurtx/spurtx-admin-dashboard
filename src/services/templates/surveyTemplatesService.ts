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

export type SurveyTemplateResponse = {
  data: SurveyTemplate[];
  total: number;
  page: number;
  searchQuery?: string;
};

const prefix = "/spur";

const surveyTemplateService = {
  // ✅ Create a new survey template
  createSurveyTemplate: async (data: unknown, reqConfig?: ReqConfig) => {
    const response = await toolkitClient.post(
      `${prefix}/survey/template`,
      data,
      reqConfig
    );
    return response.data;
  },

  // ✅ Get survey templates (returns just .data, not AxiosResponse)
  getSurveysTemplates: async (
    params: SearchParamsType,
    reqConfig?: ReqConfig
  ): Promise<SurveyTemplateResponse> => {
    const { page, take, searchQuery } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("take", take.toString());
    if (page) queryParams.append("page", page.toString());
    if (searchQuery) queryParams.append("searchQuery", searchQuery);

    const response = await toolkitClient.get(
      `${prefix}/survey/admin/template?${queryParams.toString()}`,
      reqConfig
    );

    return response.data; // ✅ unwrap Axios response
  },

  // ✅ Delete a survey template
  deleteSurveyTemplate: async (id: string, reqConfig?: ReqConfig) => {
    const response = await toolkitClient.delete(
      `${prefix}/survey/template/${id}`,
      reqConfig
    );
    return response.data;
  },
};

export default surveyTemplateService;
