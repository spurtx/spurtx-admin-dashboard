// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
// import createWalletService from "../../../services/sync/syncWalletService";
// import { useApi } from "../../useApi";
// import { PaginatedResponse } from "../../../types/api";

// interface WalletFilters {
//   page?: number;
//   limit?: number;
//   status?: string;
//   projectId?: string;
//   search?: string;
//   sortBy?: string;
//   createdBy?: string;
// }

// interface UseWalletDataOptions extends WalletFilters {
//   queryOptions?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>;
// }

// export const useWalletData = ({
//   page = 1,
//   limit = 20,
//   status,
//   projectId,
//   search,
//   createdBy,
//   sortBy = "createdAt:DESC", // default
//   queryOptions = {}
// }: UseWalletDataOptions = {}) => {
//   const { api } = useApi();
//   const service = createWalletService({ api });

//   return useQuery<PaginatedResponse, Error>({
//     queryKey: ['wallets-data', page, limit, status, projectId, search, sortBy, createdBy],
//     // queryFn: async () => {
//     //   const token = localStorage.getItem("token");
//     //   if (!token) throw new Error("Authentication token not found");

//     //   const response = await service.getFilteredWallets(
//     //     { page, limit, status, projectId, search, sortBy, createdBy },
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`
//     //       }
//     //     }
//     //   );

//     //   console.log('Wallet API Response:', response.data);
//     //   return response;
//     // },

//     queryFn: async () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("Authentication token not found");
  
//   const response = await service.getFilteredWallets(
//     { page, limit, search, sortBy },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'api-key': 'sync-tiTymZaU85Ud-key' // Add this line
//       }
//     }
//   );
//   return response;
// },
//     ...queryOptions
//   });
// };


import { useQuery } from "@tanstack/react-query";
import createWalletService from "../../../services/sync/syncWalletService";
import { useApi } from "../../useApi";

export const useWalletData = () => {
  const { api } = useApi();
  const service = createWalletService({ api });

  return useQuery({
    queryKey: ['wallets-data'],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      
      // Use the exact headers from old admin
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'api-key': 'sync-tiTymZaU85Ud-key'
        }
      };

      try {
        return await service.getWalletTransfers(config);
      } catch (error) {
        console.error("Wallet data error:", {
          message: error.message,
          response: error.response?.data
        });
        throw error;
      }
    },
    retry: false
  });
};