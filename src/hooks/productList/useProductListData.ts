import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService, ReqConfig } from "../../types/api";
import createProductListService from "../../services/productList/productListService";
import type {
  ProductListItem,
  Skill,
  ProjectCategory,
  Service,
  Industry
} from "../../services/productList/productListService";

export type { ProductListItem, Skill, ProjectCategory, Service, Industry };

export function useProductListData(apiService: ApiService) {
  const queryClient = useQueryClient();
  const productListService = createProductListService(apiService);

  const invalidateProductLists = () => {
    queryClient.invalidateQueries({ queryKey: ["productLists"] });
  };

  // ======================== Skills ========================
  const getSkills = (config?: ReqConfig) => {
    return useQuery({
      queryKey: ["productLists", "skills"],
      queryFn: () => productListService.getSkills(config),
      staleTime: 5 * 60 * 1000,
    });
  };

  // Fixed mutation hooks - removed the extra function wrapper
  const addSkill = useMutation({
    mutationFn: (skill: Omit<Skill, "id">) => 
      productListService.addSkill(skill),
    onSuccess: invalidateProductLists,
  });

  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Skill, "id">> }) => 
      productListService.updateSkill(id, data),
    onSuccess: invalidateProductLists,
  });

  const deleteSkill = useMutation({
    mutationFn: (id: string) => productListService.deleteSkill(id),
    onSuccess: invalidateProductLists,
  });

  // Repeat the same pattern for other categories...
  // ================= Project Categories ===================
  const getProjectCategories = (config?: ReqConfig) => {
    return useQuery({
      queryKey: ["productLists", "projectCategories"],
      queryFn: () => productListService.getProjectCategories(config),
      staleTime: 5 * 60 * 1000,
    });
  };

  const addProjectCategory = useMutation({
    mutationFn: (category: Omit<ProjectCategory, "id">) => 
      productListService.addProjectCategory(category),
    onSuccess: invalidateProductLists,
  });

  const updateProjectCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<ProjectCategory, "id">> }) => 
      productListService.updateProjectCategory(id, data),
    onSuccess: invalidateProductLists,
  });

  const deleteProjectCategory = useMutation({
    mutationFn: (id: string) => productListService.deleteProjectCategory(id),
    onSuccess: invalidateProductLists,
  });

  // ======================= Services ========================
  const getServices = (config?: ReqConfig) => {
    return useQuery({
      queryKey: ["productLists", "services"],
      queryFn: () => productListService.getServices(config),
      staleTime: 5 * 60 * 1000,
    });
  };

  const addService = useMutation({
    mutationFn: (service: Omit<Service, "id">) => 
      productListService.addService(service),
    onSuccess: invalidateProductLists,
  });

  const updateService = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Service, "id">> }) => 
      productListService.updateService(id, data),
    onSuccess: invalidateProductLists,
  });

  const deleteService = useMutation({
    mutationFn: (id: string) => productListService.deleteService(id),
    onSuccess: invalidateProductLists,
  });

  // ====================== Industries =======================
  const getIndustries = (config?: ReqConfig) => {
    return useQuery({
      queryKey: ["productLists", "industries"],
      queryFn: () => productListService.getIndustries(config),
      staleTime: 5 * 60 * 1000,
    });
  };

  const addIndustry = useMutation({
    mutationFn: (industry: Omit<Industry, "id">) => 
      productListService.addIndustry(industry),
    onSuccess: invalidateProductLists,
  });

  const updateIndustry = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Industry, "id">> }) => 
      productListService.updateIndustry(id, data),
    onSuccess: invalidateProductLists,
  });

  const deleteIndustry = useMutation({
    mutationFn: (id: string) => productListService.deleteIndustry(id),
    onSuccess: invalidateProductLists,
  });

  return {
    skills: {
      get: getSkills,
      add: addSkill,
      update: updateSkill,
      delete: deleteSkill,
    },
    projectCategories: {
      get: getProjectCategories,
      add: addProjectCategory,
      update: updateProjectCategory,
      delete: deleteProjectCategory,
    },
    services: {
      get: getServices,
      add: addService,
      update: updateService,
      delete: deleteService,
    },
    industries: {
      get: getIndustries,
      add: addIndustry,
      update: updateIndustry,
      delete: deleteIndustry,
    },
  };
}