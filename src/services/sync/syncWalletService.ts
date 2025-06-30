

import { ApiService, ReqConfig } from "../../types/api";
import { AxiosError } from "axios";

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
  const getWalletTransfers = async (
    config?: ReqConfig
  ): Promise<WalletTransfer[]> => {
    try {
      const response = await api.get("/admin/flutterwave-transfers", config);

      if (response.data && response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || "Failed to fetch wallet transfers");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<any>;
      console.error("Wallet transfers error:", {
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch wallet transfers");
    }
  };

  const getWalletBalance = async (
    config?: ReqConfig
  ): Promise<WalletBalance> => {
    try {
      const response = await api.get("/admin/flutterwave-wallet-balance", config);

      if (response.data && response.data.status === "success") {
        return response.data.data[0];
      } else {
        throw new Error(response.data?.message || "Failed to fetch wallet balance");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<any>;
      console.error("Wallet balance error:", {
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch wallet balance");
    }
  };

  return {
    getWalletTransfers,
    getWalletBalance,
  };
}
