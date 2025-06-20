
import { ApiService, ReqConfig } from "../../types/api";

interface Referral {
  id: string;
  label: string;
  frequency: number;
  code: string;
  pageVisit: number;
  couponId: string | null;
  signUps?: number;
}

interface ReferralResponse {
  data: Referral[];
}

const ENDPOINTS = {
  FILTERED_REFERRALS: "/common/referrals",
  ADD_REFERRAL: "/common/referrals/add", // Adjust this endpoint as needed
};

export default function createReferralService({ api }: ApiService) {
  const getReferrals = async (config?: ReqConfig): Promise<ReferralResponse> => {
    const response = await api.get(ENDPOINTS.FILTERED_REFERRALS, config);
    return response.data;
  };

  const addReferral = async (referral: Omit<Referral, 'id'>, config?: ReqConfig): Promise<Referral> => {
    const response = await api.post(ENDPOINTS.ADD_REFERRAL, referral, config);
    return response.data;
  };

  return {
    getReferrals,
    addReferral,
  };
}