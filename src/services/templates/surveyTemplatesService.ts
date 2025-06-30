// src/services/surveyTemplatesService.ts
import { toolkitClient } from "../../lib/toolkitClient";
import { AxiosRequestConfig } from "axios";

// Define Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  category?: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Question {
  id: string;
  text: string;
  type: "text" | "multiple-choice" | "rating" | "boolean" | "scale";
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
}

// Define filters for templates
interface TemplateFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
  sortBy?: string;
  createdBy?: string;
}

// Paginated response structure (reusable)
export interface PaginatedResponse<T> {
  data: T[];
  links: {
    current: string;
    next?: string;
    last?: string;
    prev?: string;
    first?: string;
  };
  meta: {
    currentPage: number;
    itemsPerPage: number;
    sortBy: string[];
    totalItems: number;
    totalPages: number;
  };
}

const ENDPOINT = "/spur/survey/admin/template";

const SurveyTemplatesService = {
  /**
   * Get paginated templates for table display
   */
  async getTemplatesForTable(
    filters: TemplateFilters = {},
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<Template>> {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 25,
      ...(filters.status && { 'filter.status': `$eq:${filters.status}` }),
      ...(filters.category && { 'filter.category': `$eq:${filters.category}` }),
      ...(filters.createdBy && { 'filter.createdBy.id': `$eq:${filters.createdBy}` }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
    };

    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params,
    });

    return response.data;
  },

  /**
   * Get a single template by ID
   */
  async getTemplateById(
    id: string,
    config?: AxiosRequestConfig
  ): Promise<Template> {
    const response = await toolkitClient.get(`${ENDPOINT}/${id}`, config);
    return response.data;
  },

  /**
   * Create a new template
   */
  async createTemplate(
    templateData: Omit<Template, "id" | "createdAt" | "updatedAt" | "createdBy">,
    config?: AxiosRequestConfig
  ): Promise<Template> {
    const response = await toolkitClient.post(ENDPOINT, templateData, config);
    return response.data;
  },

  /**
   * Update an existing template
   */
  async updateTemplate(
    id: string,
    updateData: Partial<Omit<Template, "id" | "createdAt" | "createdBy">>,
    config?: AxiosRequestConfig
  ): Promise<Template> {
    const response = await toolkitClient.patch(`${ENDPOINT}/${id}`, updateData, config);
    return response.data;
  },

  /**
   * Delete a template
   */
  async deleteTemplate(
    id: string,
    config?: AxiosRequestConfig
  ): Promise<{ message: string }> {
    const response = await toolkitClient.delete(`${ENDPOINT}/${id}`, config);
    return response.data;
  },

  /**
   * Get all templates without pagination (for dropdowns)
   */
  async getAllTemplates(
    config?: AxiosRequestConfig
  ): Promise<Template[]> {
    const response = await toolkitClient.get(ENDPOINT, {
      ...config,
      params: { limit: 1000 }  // Adjust based on expected maximum
    });
    return response.data.data;
  },

  /**
   * Get categories for templates
   */
  async getTemplateCategories(
    config?: AxiosRequestConfig
  ): Promise<string[]> {
    const response = await toolkitClient.get(`${ENDPOINT}/categories`, config);
    return response.data;
  }
};

export default SurveyTemplatesService;