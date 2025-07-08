// src/hooks/templates/useAppraisalData.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import appraisalTemplatesService from "../../services/templates/appraisalTemplatesService";
import { AxiosRequestConfig } from "axios";


// Define types
export type AppraisalTemplate = {
  id: string;
  name: string;
  // Add other fields based on your API response
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  type?: string;
  // ... other fields
};

export type AppraisalTemplateResponse = {
  data: AppraisalTemplate[];
  total: number;
  page: number;
  searchQuery?: string;
  // Add pagination metadata based on your API
  pageMetaDto?: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

export type SearchParams = {
  page?: number;
  take: number;
  searchQuery?: string;
};

type MutationOptions = {
  reqConfig?: AxiosRequestConfig;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function useAppraisalData() {
  const queryClient = useQueryClient();

  // Fetch appraisal templates
  const getTemplates = (params: SearchParams, reqConfig?: AxiosRequestConfig) => {
    return useQuery<AppraisalTemplateResponse, Error>({
      queryKey: ["appraisalTemplates", params],
      queryFn: () => appraisalTemplatesService.getAppraisalTemplates(params, reqConfig),
      staleTime: 5 * 60 * 1000, // 5 minutes cache
      // @ts-ignore
      keepPreviousData: true,
      onSuccess: (data: any) => {
        console.log("Appraisal templates response:", data);
      },
    });
  };

  // Create appraisal template
  const createTemplate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: (data: unknown) =>
        appraisalTemplatesService.createAppraisalTemplate(data, options?.reqConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appraisalTemplates"] });
        options?.onSuccess?.();
      },
      onError: (error) => {
        console.error("Create appraisal template error:", error);
        options?.onError?.(error);
      },
    });
  };

  // Delete appraisal template
  const deleteTemplate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: (id: string) =>
        appraisalTemplatesService.deleteAppraisalTemplate(id, options?.reqConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["appraisalTemplates"] });
        options?.onSuccess?.();
      },
      onError: (error) => {
        console.error("Delete appraisal template error:", error);
        options?.onError?.(error);
      },
    });
  };

  return {
    getTemplates,
    createTemplate,
    deleteTemplate,
  };
}