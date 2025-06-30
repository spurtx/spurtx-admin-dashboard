
// // import {
// //   useQuery,
// //   useMutation,
// //   useQueryClient,
// //   UseQueryOptions,
// //   UseMutationOptions,
// // } from "@tanstack/react-query";
// // import SurveyTemplatesService, {
// //   Template,
// //   PaginatedResponse,
// // } from "../../services/templates/surveyTemplatesService";
// // import { AxiosRequestConfig } from "axios";

// // // Define query keys
// // const queryKeys = {
// //   all: ["survey-templates"] as const,
// //   lists: () => [...queryKeys.all, "list"] as const,
// //   list: (filters: TemplateFilters) => [...queryKeys.lists(), filters] as const,
// //   details: () => [...queryKeys.all, "detail"] as const,
// //   detail: (id: string) => [...queryKeys.details(), id] as const,
// //   categories: () => [...queryKeys.all, "categories"] as const,
// // };

// // interface TemplateFilters {
// //   page?: number;
// //   limit?: number;
// //   status?: string;
// //   category?: string;
// //   search?: string;
// //   sortBy?: string;
// //   createdBy?: string;
// // }

// // // interface UpdateTemplateContext {
// // //   previousTemplate: Template | undefined;  // Changed to required property
// // // }

// // // interface DeleteTemplateContext {
// // //   previousTemplates: PaginatedResponse<Template> | undefined; // Changed to required property
// // //   previousTemplate: Template | undefined; // Changed to required property
// // // }


// // interface UseTemplateListOptions extends TemplateFilters {
// //   queryOptions?: Omit<
// //     UseQueryOptions<PaginatedResponse<Template>, Error>,
// //     "queryKey" | "queryFn"
// //   >;
// //   config?: AxiosRequestConfig;
// // }

// // interface UseTemplateDetailOptions {
// //   id: string;
// //   queryOptions?: Omit<UseQueryOptions<Template, Error>, "queryKey" | "queryFn">;
// //   config?: AxiosRequestConfig;
// // }

// // interface CreateTemplateOptions {
// //   mutationOptions?: Omit<
// //     UseMutationOptions<Template, Error, Omit<Template, "id" | "createdAt" | "updatedAt" | "createdBy">>,
// //     "mutationFn"
// //   >;
// //   config?: AxiosRequestConfig;
// // }

// // interface UpdateTemplateOptions {
// //   mutationOptions?: Omit<
// //     UseMutationOptions<Template, Error, { id: string; data: Partial<Template> }>,
// //     "mutationFn"
// //   >;
// //   config?: AxiosRequestConfig;
// // }

// // interface DeleteTemplateOptions {
// //   mutationOptions?: Omit<
// //     UseMutationOptions<{ message: string }, Error, string>,
// //     "mutationFn"
// //   >;
// //   config?: AxiosRequestConfig;
// // }

// // // Define context types for optimistic updates
// // interface DeleteTemplateContext {
// //   previousTemplates?: PaginatedResponse<Template>;
// //   previousTemplate?: Template;
// // }

// // interface UpdateTemplateContext {
// //   previousTemplate?: Template;
// // }

// // export const useTemplateList = ({
// //   page = 1,
// //   limit = 25,
// //   status,
// //   category,
// //   search,
// //   sortBy,
// //   createdBy,
// //   queryOptions = {},
// //   config,
// // }: UseTemplateListOptions = {}) => {
// //   const filters = {
// //     page,
// //     limit,
// //     status,
// //     category,
// //     search,
// //     sortBy,
// //     createdBy,
// //   };

// //   return useQuery<PaginatedResponse<Template>, Error>({
// //     queryKey: queryKeys.list(filters),
// //     queryFn: async () => {
// //       return SurveyTemplatesService.getTemplatesForTable(filters, config);
// //     },
// //     ...queryOptions,
// //   });
// // };

// // export const useTemplateDetail = ({
// //   id,
// //   queryOptions = {},
// //   config,
// // }: UseTemplateDetailOptions) => {
// //   return useQuery<Template, Error>({
// //     queryKey: queryKeys.detail(id),
// //     queryFn: async () => {
// //       return SurveyTemplatesService.getTemplateById(id, config);
// //     },
// //     enabled: !!id, // Only fetch when ID is available
// //     ...queryOptions,
// //   });
// // };

// // export const useTemplateCategories = (config?: AxiosRequestConfig) => {
// //   return useQuery<string[], Error>({
// //     queryKey: queryKeys.categories(),
// //     queryFn: async () => {
// //       return SurveyTemplatesService.getTemplateCategories(config);
// //     },
// //     staleTime: 60 * 60 * 1000, // Cache for 1 hour
// //   });
// // };

// // export const useCreateTemplate = ({
// //   mutationOptions = {},
// //   config,
// // }: CreateTemplateOptions = {}) => {
// //   const queryClient = useQueryClient();

// //   return useMutation<
// //     Template,
// //     Error,
// //     Omit<Template, "id" | "createdAt" | "updatedAt" | "createdBy">
// //   >({
// //     mutationFn: (templateData) => {
// //       return SurveyTemplatesService.createTemplate(templateData, config);
// //     },
// //     onSuccess: (newTemplate) => {
// //       // Invalidate all template lists
// //       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      
// //       // Update the cache for the new template
// //       queryClient.setQueryData(queryKeys.detail(newTemplate.id), newTemplate);
// //     },
// //     ...mutationOptions,
// //   });
// // };

// // export const useUpdateTemplate = ({
// //   mutationOptions = {},
// //   config,
// // }: UpdateTemplateOptions = {}) => {
// //   const queryClient = useQueryClient();

// //   return useMutation<Template, Error, { id: string; data: Partial<Template> }, UpdateTemplateContext>({
// //     mutationFn: ({ id, data }) => {
// //       return SurveyTemplatesService.updateTemplate(id, data, config);
// //     },
// //     onMutate: async (variables): Promise<UpdateTemplateContext> => {
// //       // Cancel any outgoing refetches to avoid overwriting optimistic update
// //       await queryClient.cancelQueries({ queryKey: queryKeys.detail(variables.id) });
      
// //       // Snapshot the previous value
// //       const previousTemplate = queryClient.getQueryData<Template>(
// //         queryKeys.detail(variables.id)
// //       );
      
// //       // Optimistically update to the new value
// //       if (previousTemplate) {
// //         queryClient.setQueryData<Template>(
// //           queryKeys.detail(variables.id),
// //           { ...previousTemplate, ...variables.data }
// //         );
// //       }
      
// //       return { previousTemplate };
// //     },
// //     onError: (_err, variables, context) => {
// //       // Rollback to the previous value on error
// //       if (context?.previousTemplate) {
// //         queryClient.setQueryData(
// //           queryKeys.detail(variables.id),
// //           context.previousTemplate
// //         );
// //       }
// //     },
// //     onSuccess: (updatedTemplate) => {
// //       // Update the detail query
// //       queryClient.setQueryData(
// //         queryKeys.detail(updatedTemplate.id),
// //         updatedTemplate
// //       );
      
// //       // Invalidate all template lists
// //       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
// //     },
// //     ...mutationOptions,
// //   });
// // };

// // export const useDeleteTemplate = ({
// //   mutationOptions = {},
// //   config,
// // }: DeleteTemplateOptions = {}) => {
// //   const queryClient = useQueryClient();

// //   return useMutation<{ message: string }, Error, string, DeleteTemplateContext>({
// //     mutationFn: (id) => {
// //       return SurveyTemplatesService.deleteTemplate(id, config);
// //     },
// //     onMutate: async (id): Promise<DeleteTemplateContext> => {
// //       // Cancel any outgoing refetches to avoid overwriting
// //       await queryClient.cancelQueries({ queryKey: queryKeys.lists() });
// //       await queryClient.cancelQueries({ queryKey: queryKeys.detail(id) });
      
// //       // Snapshot the previous value
// //       const previousTemplates = queryClient.getQueryData<PaginatedResponse<Template>>(
// //         queryKeys.lists()
// //       );
      
// //       const previousTemplate = queryClient.getQueryData<Template>(
// //         queryKeys.detail(id)
// //       );
      
// //       // Optimistically remove the template
// //       if (previousTemplates) {
// //         queryClient.setQueryData<PaginatedResponse<Template>>(
// //           queryKeys.lists(),
// //           {
// //             ...previousTemplates,
// //             data: previousTemplates.data.filter(t => t.id !== id),
// //           }
// //         );
// //       }
      
// //       // Remove the detail query
// //       queryClient.removeQueries({ queryKey: queryKeys.detail(id) });
      
// //       return { previousTemplates, previousTemplate };
// //     },
// //     onError: (_err, id, context) => {
// //       // Rollback to the previous value on error
// //       if (context?.previousTemplates) {
// //         queryClient.setQueryData(
// //           queryKeys.lists(),
// //           context.previousTemplates
// //         );
// //       }
// //       if (context?.previousTemplate) {
// //         queryClient.setQueryData(
// //           queryKeys.detail(id),
// //           context.previousTemplate
// //         );
// //       }
// //     },
// //     onSuccess: () => {
// //       // Invalidate all template lists
// //       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
// //     },
// //     ...mutationOptions,
// //   });
// // };

// // // Helper hook to manage all template operations
// // export const useSurveyTemplates = () => {
// //   return {
// //     useTemplateList,
// //     useTemplateDetail,
// //     useTemplateCategories,
// //     useCreateTemplate,
// //     useUpdateTemplate,
// //     useDeleteTemplate,
// //   };
// // };


// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   UseQueryOptions,
//   UseMutationOptions,
// } from "@tanstack/react-query";
// import SurveyTemplatesService, {
//   Template,
//   PaginatedResponse,
// } from "../../services/templates/surveyTemplatesService";
// import { AxiosRequestConfig } from "axios";

// // Query keys
// const queryKeys = {
//   all: ["survey-templates"] as const,
//   lists: () => [...queryKeys.all, "list"] as const,
//   list: (filters: TemplateFilters) => [...queryKeys.lists(), filters] as const,
//   details: () => [...queryKeys.all, "detail"] as const,
//   detail: (id: string) => [...queryKeys.details(), id] as const,
//   categories: () => [...queryKeys.all, "categories"] as const,
// };

// // Filters interface
// interface TemplateFilters {
//   page?: number;
//   limit?: number;
//   status?: string;
//   category?: string;
//   search?: string;
//   sortBy?: string;
//   createdBy?: string;
// }

// // Context types for optimistic updates
// interface DeleteTemplateContext {
//   previousTemplates?: PaginatedResponse<Template>;
//   previousTemplate?: Template;
// }

// interface UpdateTemplateContext {
//   previousTemplate?: Template;
// }

// // Hook Options
// interface UseTemplateListOptions extends TemplateFilters {
//   queryOptions?: Omit<
//     UseQueryOptions<PaginatedResponse<Template>, Error>,
//     "queryKey" | "queryFn"
//   >;
//   config?: AxiosRequestConfig;
// }

// interface UseTemplateDetailOptions {
//   id: string;
//   queryOptions?: Omit<UseQueryOptions<Template, Error>, "queryKey" | "queryFn">;
//   config?: AxiosRequestConfig;
// }

// interface CreateTemplateOptions {
//   mutationOptions?: Omit<
//     UseMutationOptions<
//       Template,
//       Error,
//       Omit<Template, "id" | "createdAt" | "updatedAt" | "createdBy">
//     >,
//     "mutationFn"
//   >;
//   config?: AxiosRequestConfig;
// }

// interface UpdateTemplateOptions {
//   mutationOptions?: Omit<
//     UseMutationOptions<
//       Template,
//       Error,
//       { id: string; data: Partial<Template> },
//       UpdateTemplateContext
//     >,
//     "mutationFn"
//   >;
//   config?: AxiosRequestConfig;
// }

// interface DeleteTemplateOptions {
//   mutationOptions?: Omit<
//     UseMutationOptions<string, Error, string, DeleteTemplateContext>,
//     "mutationFn"
//   >;
//   config?: AxiosRequestConfig;
// }

// // Hooks

// export const useTemplateList = ({
//   page = 1,
//   limit = 25,
//   status,
//   category,
//   search,
//   sortBy,
//   createdBy,
//   queryOptions = {},
//   config,
// }: UseTemplateListOptions = {}) => {
//   const filters = { page, limit, status, category, search, sortBy, createdBy };

//   return useQuery<PaginatedResponse<Template>, Error>({
//     queryKey: queryKeys.list(filters),
//     queryFn: () =>
//       SurveyTemplatesService.getTemplatesForTable(filters, config),
//     ...queryOptions,
//   });
// };

// export const useTemplateDetail = ({
//   id,
//   queryOptions = {},
//   config,
// }: UseTemplateDetailOptions) => {
//   return useQuery<Template, Error>({
//     queryKey: queryKeys.detail(id),
//     queryFn: () => SurveyTemplatesService.getTemplateById(id, config),
//     enabled: !!id,
//     ...queryOptions,
//   });
// };

// export const useTemplateCategories = (config?: AxiosRequestConfig) => {
//   return useQuery<string[], Error>({
//     queryKey: queryKeys.categories(),
//     queryFn: () => SurveyTemplatesService.getTemplateCategories(config),
//     staleTime: 60 * 60 * 1000,
//   });
// };

// export const useCreateTemplate = ({
//   mutationOptions = {},
//   config,
// }: CreateTemplateOptions = {}) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     Template,
//     Error,
//     Omit<Template, "id" | "createdAt" | "updatedAt" | "createdBy">
//   >({
//     mutationFn: (templateData) =>
//       SurveyTemplatesService.createTemplate(templateData, config),
//     onSuccess: (newTemplate) => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
//       queryClient.setQueryData(queryKeys.detail(newTemplate.id), newTemplate);
//     },
//     ...mutationOptions,
//   });
// };

// export const useUpdateTemplate = ({
//   mutationOptions = {},
//   config,
// }: UpdateTemplateOptions = {}) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     Template,
//     Error,
//     { id: string; data: Partial<Template> },
//     UpdateTemplateContext
//   >({
//     mutationFn: ({ id, data }) =>
//       SurveyTemplatesService.updateTemplate(id, data, config),

//     onMutate: async ({ id, data }) => {
//       await queryClient.cancelQueries({ queryKey: queryKeys.detail(id) });

//       const previousTemplate =
//         queryClient.getQueryData<Template>(queryKeys.detail(id));

//       if (previousTemplate) {
//         queryClient.setQueryData<Template>(queryKeys.detail(id), {
//           ...previousTemplate,
//           ...data,
//         });
//       }

//       return { previousTemplate };
//     },

//     onError: (_err, { id }, context) => {
//       if (context?.previousTemplate) {
//         queryClient.setQueryData(queryKeys.detail(id), context.previousTemplate);
//       }
//     },

//     onSuccess: (updatedTemplate) => {
//       queryClient.setQueryData(
//         queryKeys.detail(updatedTemplate.id),
//         updatedTemplate
//       );
//       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
//     },

//     ...mutationOptions,
//   });
// };

// export const useDeleteTemplate = ({
//   mutationOptions = {},
//   config,
// }: DeleteTemplateOptions = {}) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     string,
//     Error,
//     string,
//     DeleteTemplateContext
//   >({
//     mutationFn: (id) => SurveyTemplatesService.deleteTemplate(id, config),

//     onMutate: async (id) => {
//       await queryClient.cancelQueries({ queryKey: queryKeys.lists() });
//       await queryClient.cancelQueries({ queryKey: queryKeys.detail(id) });

//       const previousTemplates =
//         queryClient.getQueryData<PaginatedResponse<Template>>(
//           queryKeys.lists()
//         );
//       const previousTemplate = queryClient.getQueryData<Template>(
//         queryKeys.detail(id)
//       );

//       if (previousTemplates) {
//         queryClient.setQueryData<PaginatedResponse<Template>>(
//           queryKeys.lists(),
//           {
//             ...previousTemplates,
//             data: previousTemplates.data.filter((t) => t.id !== id),
//           }
//         );
//       }

//       queryClient.removeQueries({ queryKey: queryKeys.detail(id) });

//       return { previousTemplates, previousTemplate };
//     },

//     onError: (_err, id, context) => {
//       if (context?.previousTemplates) {
//         queryClient.setQueryData(
//           queryKeys.lists(),
//           context.previousTemplates
//         );
//       }

//       if (context?.previousTemplate) {
//         queryClient.setQueryData(
//           queryKeys.detail(id),
//           context.previousTemplate
//         );
//       }
//     },

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
//     },

//     ...mutationOptions,
//   });
// };

// export const useSurveyTemplates = () => {
//   return {
//     useTemplateList,
//     useTemplateDetail,
//     useTemplateCategories,
//     useCreateTemplate,
//     useUpdateTemplate,
//     useDeleteTemplate,
//   };
// };
