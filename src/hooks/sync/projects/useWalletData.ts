


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
      } catch (error: any) {
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