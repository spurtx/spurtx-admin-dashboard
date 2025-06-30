

// import { ApiService, ReqConfig, PaginatedResponse } from "../../types/api";

// // Define Wallet and WalletFilters types
// interface Wallet {
//   id: string;
//   amountPaid: number;
//   autoRenewal: boolean;
//   createdAt: string;
//   deletedAt: string | null;
//   duration: string;
//   expiryDate: string;
//   isActive: boolean;
//   isCancelled: boolean;
//   plan: string;
//   transactionRef: string;
//   updatedAt: string;
//   user: {
//     email: string;
//     firstName: string;
//     lastName: string;
//   };
//   userId: string;
// }

// interface WalletBalance {
//   available_balance: number;
//   currency: string;
//   ledger_balance: number;
// }

// interface WalletFilters {
//   page?: number;
//   limit?: number;
//   status?: string;
//   projectId?: string;
//   search?: string;
//   sortBy?: string;
//   createdBy?: string;
// }

// interface WalletResponse extends PaginatedResponse {
//   data: {
//     data: Wallet[];
//     links: {
//       current: string;
//       next?: string;
//       last?: string;
//     };
//     meta: {
//       currentPage: number;
//       itemsPerPage: number;
//       sortBy: string[];
//       totalItems: number;
//       totalPages: number;
//     };
//   };
// }

// interface WalletBalanceResponse {
//   data: WalletBalance;
// }



// const ENDPOINTS = {
//   WALLET_TRANSFERS: "/admin/flutterwave-transfers",
//   WALLET_BALANCE: "/admin/flutterwave-wallet-balance",
// };

// export default function createWalletService({ api }: ApiService) {
//   /**
//    * Get wallet transfers without pagination
//    */
//   const getWalletTransfers = async (
//     filters: Omit<WalletFilters, 'page' | 'limit'> = {},
//     config?: ReqConfig
//   ): Promise<Wallet[]> => {
//     const params: Record<string, any> = {};

//     // Add filter parameters
//     if (filters.status) params['filter.status'] = `$eq:${filters.status}`;
//     if (filters.projectId) params['filter.projectId'] = `$eq:${filters.projectId}`;
//     if (filters.createdBy) params['filter.createdBy'] = `$eq:${filters.createdBy}`;
//     if (filters.search) params.search = filters.search;
//     if (filters.sortBy) params.sortBy = filters.sortBy;

//     const response = await api.get(ENDPOINTS.WALLET_TRANSFERS, {
//       ...config,
//       params,
//     });

//     // Assuming the API returns an array of wallets directly
//     return response.data;
//   };

//   /**
//    * Get wallet balance
//    */
//   const getWalletBalance = async (
//     config?: ReqConfig
//   ): Promise<WalletBalanceResponse> => {
//     const response = await api.get(ENDPOINTS.WALLET_BALANCE, config);
//     return response.data;
//   };

//   return {
//     getWalletTransfers, // Renamed from getFilteredWallets
//     getWalletBalance,
//   };
// }

// import { ApiService, ReqConfig } from "../../types/api";

// // Define Wallet and WalletBalance types
// export interface Wallet {
//   id: string;
//   amountPaid: number;
//   autoRenewal: boolean;
//   createdAt: string;
//   deletedAt: string | null;
//   duration: string;
//   expiryDate: string;
//   isActive: boolean;
//   isCancelled: boolean;
//   plan: string;
//   transactionRef: string;
//   updatedAt: string;
//   user: {
//     email: string;
//     firstName: string;
//     lastName: string;
//   };
//   userId: string;
// }

// interface WalletBalance {
//   available_balance: number;
//   currency: string;
//   ledger_balance: number;
// }

// interface WalletBalanceResponse {
//   data: WalletBalance;
// }

// const ENDPOINTS = {
//   WALLET_TRANSFERS: "/admin/flutterwave-transfers",
//   WALLET_BALANCE: "/admin/flutterwave-wallet-balance",
// };

// export default function createWalletService({ api }: ApiService) {
//   /**
//    * Get wallet transfers without any parameters
//    */
//   const getWalletTransfers = async (
//     config?: ReqConfig
//   ): Promise<Wallet[]> => {
//     const response = await api.get(ENDPOINTS.WALLET_TRANSFERS, config);
//     return response.data;
//   };

//   /**
//    * Get wallet balance
//    */
//   const getWalletBalance = async (
//     config?: ReqConfig
//   ): Promise<WalletBalanceResponse> => {
//     const response = await api.get(ENDPOINTS.WALLET_BALANCE, config);
//     return response.data;
//   };

//   return {
//     getWalletTransfers,
//     getWalletBalance,
//   };
// }


import { ApiService, ReqConfig } from "../../types/api";

interface WalletTransfer {
  id: number;
  account_number: string;
  bank_code: string;
  full_name: string;
  created_at: string;
  currency: string;
  debit_currency: string;
  amount: number;
  fee: number;
  status: string;
  reference: string;
  meta?: any;
  narration: string;
  approver?: any;
  complete_message: string;
  requires_approval: number;
  is_approved: number;
  bank_name: string;
}

interface WalletBalance {
  currency: string;
  available_balance: number;
  ledger_balance: number;
}

export default function createWalletService({ api }: ApiService) {
  /**
   * Get wallet transfers - exactly matches old admin service
   */
  const getWalletTransfers = async (
    config?: ReqConfig
  ): Promise<WalletTransfer[]> => {
    try {
      // Use the exact endpoint from old admin
      const response = await api.get("/admin/flutterwave-transfers", config);
      
      // Match old admin response structure
      if (response.data && response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || "Failed to fetch wallet transfers");
      }
    } catch (error) {
      console.error("Wallet transfers error:", {
        error: error.response?.data || error.message
      });
      throw new Error(error.response?.data?.message || "Failed to fetch wallet transfers");
    }
  };

  /**
   * Get wallet balance - exactly matches old admin service
   */
  const getWalletBalance = async (
    config?: ReqConfig
  ): Promise<WalletBalance> => {
    try {
      // Use the exact endpoint from old admin
      const response = await api.get("/admin/flutterwave-wallet-balance", config);
      
      // Match old admin response structure
      if (response.data && response.data.status === "success") {
        return response.data.data[0]; // Returns the first balance object
      } else {
        throw new Error(response.data?.message || "Failed to fetch wallet balance");
      }
    } catch (error) {
      console.error("Wallet balance error:", {
        error: error.response?.data || error.message
      });
      throw error;
    }
  };

  return {
    getWalletTransfers,
    getWalletBalance,
  };
}