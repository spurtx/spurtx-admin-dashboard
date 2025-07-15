import { ApiService, ReqConfig } from "../../types/api";

// Base type for all product list items
export interface ProductListItem {
  id: string;
  label: string;
  // Add other common fields as needed
}

// Specific types for each category (extend as needed)
export interface Skill extends ProductListItem {
   label: string;
}

export interface ProjectCategory extends ProductListItem {
  projectCount?: number;
}

export interface Service extends ProductListItem {
  priceRange?: string;
}

export interface Industry extends ProductListItem {
  marketSize?: string;
}

// Response types
export interface ProductListResponse<T> {
  data: T[];
}

const ENDPOINTS = {
  SKILLS: "/common/skills",
  SKILLS_METHODS: "/admin/skills",
  PROJECT_CATEGORIES: "/common/all-project-categories",
  SERVICES: "/common/all-services",
  INDUSTRIES: "/common/all-industries",
};

export default function createProductListService({ api }: ApiService) {
  // ======================== Skills ========================
  const getSkills = async (config?: ReqConfig): Promise<ProductListResponse<Skill>> => {
    const response = await api.get(ENDPOINTS.SKILLS, config);
    return response.data;
  };

  const addSkill = async (
    skill: Omit<Skill, 'id'>,
    config?: ReqConfig
  ): Promise<Skill> => {
    const response = await api.post(ENDPOINTS.SKILLS_METHODS, skill, config);
   
    return response.data?.data;
  };

  const updateSkill = async (
    id: string,
    updateData: Partial<Omit<Skill, 'id'>>,
    config?: ReqConfig
  ): Promise<Skill> => {
    const response = await api.put(
      `${ENDPOINTS.SKILLS_METHODS}/${id}`,
      updateData,
      config
    );
    return response.data;
  };

  const deleteSkill = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.delete(`${ENDPOINTS.SKILLS_METHODS}/${id}`, config);
  };

  // ================= Project Categories ===================
  const getProjectCategories = async (
    config?: ReqConfig
  ): Promise<ProductListResponse<ProjectCategory>> => {
    const response = await api.get(ENDPOINTS.PROJECT_CATEGORIES, config);
    return response.data;
  };

  const addProjectCategory = async (
    category: Omit<ProjectCategory, 'id'>,
    config?: ReqConfig
  ): Promise<ProjectCategory> => {
    const response = await api.post(ENDPOINTS.PROJECT_CATEGORIES, category, config);
    return response.data;
  };

  const updateProjectCategory = async (
    id: string,
    updateData: Partial<Omit<ProjectCategory, 'id'>>,
    config?: ReqConfig
  ): Promise<ProjectCategory> => {
    const response = await api.put(
      `${ENDPOINTS.PROJECT_CATEGORIES}/${id}`,
      updateData,
      config
    );
    return response.data;
  };

  const deleteProjectCategory = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.delete(`${ENDPOINTS.PROJECT_CATEGORIES}/${id}`, config);
  };

  // ======================= Services ========================
  const getServices = async (
    config?: ReqConfig
  ): Promise<ProductListResponse<Service>> => {
    const response = await api.get(ENDPOINTS.SERVICES, config);
    return response.data;
  };

  const addService = async (
    service: Omit<Service, 'id'>,
    config?: ReqConfig
  ): Promise<Service> => {
    const response = await api.post(ENDPOINTS.SERVICES, service, config);
    return response.data;
  };

  const updateService = async (
    id: string,
    updateData: Partial<Omit<Service, 'id'>>,
    config?: ReqConfig
  ): Promise<Service> => {
    const response = await api.put(
      `${ENDPOINTS.SERVICES}/${id}`,
      updateData,
      config
    );
    return response.data;
  };

  const deleteService = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.delete(`${ENDPOINTS.SERVICES}/${id}`, config);
  };

  // ====================== Industries =======================
  const getIndustries = async (
    config?: ReqConfig
  ): Promise<ProductListResponse<Industry>> => {
    const response = await api.get(ENDPOINTS.INDUSTRIES, config);
    return response.data;
  };

  const addIndustry = async (
    industry: Omit<Industry, 'id'>,
    config?: ReqConfig
  ): Promise<Industry> => {
    const response = await api.post(ENDPOINTS.INDUSTRIES, industry, config);
    return response.data;
  };

  const updateIndustry = async (
    id: string,
    updateData: Partial<Omit<Industry, 'id'>>,
    config?: ReqConfig
  ): Promise<Industry> => {
    const response = await api.put(
      `${ENDPOINTS.INDUSTRIES}/${id}`,
      updateData,
      config
    );
    return response.data;
  };

  const deleteIndustry = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.delete(`${ENDPOINTS.INDUSTRIES}/${id}`, config);
  };

  return {
    // Skills methods
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    
    // Project Categories methods
    getProjectCategories,
    addProjectCategory,
    updateProjectCategory,
    deleteProjectCategory,
    
    // Services methods
    getServices,
    addService,
    updateService,
    deleteService,
    
    // Industries methods
    getIndustries,
    addIndustry,
    updateIndustry,
    deleteIndustry
  };
}