import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import surveyTemplateService from "../../services/templates/surveyTemplatesService";
import { AxiosRequestConfig } from "axios";

// Define types
type SurveyTemplate = {
  id: string;
  name: string;
  // Add other fields as needed
};

type SurveyTemplateResponse = {
  data: SurveyTemplate[];
  total: number;
  page: number;
};

type SearchParams = {
  page?: number;
  take: number;
  searchQuery?: string;
};

type MutationOptions = {
  reqConfig?: AxiosRequestConfig;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function useSurveyData() {
  const queryClient = useQueryClient();

  // ✅ Fetch survey templates
  const getTemplates = (params: SearchParams, reqConfig?: AxiosRequestConfig) => {
  return useQuery<SurveyTemplateResponse, Error>({
    queryKey: ["surveyTemplates", params],
    queryFn: () => surveyTemplateService.getSurveysTemplates(params, reqConfig),
    staleTime: 5 * 60 * 1000,
    // @ts-ignore
    keepPreviousData: true,
    onSuccess: (data: any) => {
      console.log("Survey response:", data);
    },
  });
};

  // ✅ Create survey template
  const createTemplate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: (data: unknown) =>
        surveyTemplateService.createSurveyTemplate(data, options?.reqConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["surveyTemplates"] });
        options?.onSuccess?.();
      },
      onError: options?.onError,
    });
  };

  // ✅ Delete survey template
  const deleteTemplate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: (id: string) =>
        surveyTemplateService.deleteSurveyTemplate(id, options?.reqConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["surveyTemplates"] });
        options?.onSuccess?.();
      },
      onError: options?.onError,
    });
  };

  return {
    getTemplates,
    createTemplate,
    deleteTemplate,
  };
}
