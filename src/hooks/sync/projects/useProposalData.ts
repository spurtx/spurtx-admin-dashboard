import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import createProposalService from "../../../services/sync/proposalService";
import { useApi } from "../../useApi";
import { PaginatedResponse } from "../../../types/api";

interface ProposalFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
  createdBy?: string;
}

interface UseProposalsDataOptions extends ProposalFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useProposalsData = ({
  page = 1,
  limit = 20,
  status,
  projectId,
  search,
  createdBy,
  sortBy = "createdAt:DESC", // Default sort by creation date descending
  queryOptions = {}
}: UseProposalsDataOptions = {}) => {
  const { api } = useApi();
  const service = createProposalService({ api });

  return useQuery<PaginatedResponse, Error>({
    queryKey: ['proposals-data', page, limit, status, projectId, search, sortBy, createdBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response = await service.getFilteredProposals(
        { page, limit, status, projectId, search, sortBy, createdBy },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Proposals API Response:', response.data);
      return response;
    },
    ...queryOptions
  });
};