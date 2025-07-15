

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
  GET_REFERRALS: "/common/referrals",
  ADD_REFERRAL: "/admin/referrals",          // POST (create)
  UPDATE_REFERRAL: "/admin/referrals",       // PUT (update)
  DELETE_REFERRAL: "/admin/referrals",       // DELETE
  PAY_REFERRAL: "/admin/referrals",          // PATCH (mark as paid)
};

export default function createReferralService({ api }: ApiService) {
  const getReferrals = async (config?: ReqConfig): Promise<ReferralResponse> => {
    const response = await api.get(ENDPOINTS.GET_REFERRALS, config);
    return response.data;
  };

  const addReferral = async (
    referral: Omit<Referral, 'id'>,
    config?: ReqConfig
  ): Promise<Referral> => {
    const response = await api.post(ENDPOINTS.ADD_REFERRAL, referral, config);
    return response.data;
  };

  const updateReferral = async (
    id: string,
    updateData: {
      label: string;
      frequency: number;
      couponId?: string;
    },
    config?: ReqConfig
  ): Promise<Referral> => {
    const response = await api.put(
      `${ENDPOINTS.UPDATE_REFERRAL}/${id}`,
      updateData,
      config
    );
    return response.data;
  };

  const deleteReferral = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.delete(`${ENDPOINTS.DELETE_REFERRAL}/${id}`, config);
  };

  const payForReferral = async (
    id: string,
    config?: ReqConfig
  ): Promise<void> => {
    await api.patch(`${ENDPOINTS.PAY_REFERRAL}/${id}`, undefined, config);
  };

  return {
    getReferrals,
    addReferral,
    updateReferral,
    deleteReferral,
    payForReferral,
  };
}