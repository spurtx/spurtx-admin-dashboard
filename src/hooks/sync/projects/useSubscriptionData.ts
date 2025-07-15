import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import createSubscriptionService from "../../../services/sync/subscriptionService";
import { useApi } from "../../useApi";
import { PaginatedResponse } from "../../../types/api";

interface SubscriptionFilters {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  search?: string;
  sortBy?: string;
  createdBy?: string;
}

interface UseSubscriptionDataOptions extends SubscriptionFilters {
  queryOptions?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>;
}

export const useSubscriptionData = ({
  page = 1,
  limit = 20,
  status,
  projectId,
  search,
  createdBy,
  sortBy = "createdAt:DESC", // Default sort by creation date descending
  queryOptions = {}
}: UseSubscriptionDataOptions = {}) => {
  const { api } = useApi();
  const service = createSubscriptionService({ api });

  return useQuery<PaginatedResponse, Error>({
    queryKey: ['proposals-data', page, limit, status, projectId, search, sortBy, createdBy],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      const response = await service.getFilteredSubscription(
        { page, limit, status, projectId, search, sortBy, createdBy },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Subscription API Response:', response.data);
      return response;
    },
    ...queryOptions
  });
};