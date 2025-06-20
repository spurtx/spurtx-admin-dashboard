import { useQuery } from "@tanstack/react-query";
import createReferralService from "../../../services/sync/referralService";
import { useApi } from "../../useApi";

export const useReferralsData = () => {
  const { api } = useApi();
  const service = createReferralService({ api });

  return useQuery({
    queryKey: ['referrals'],
    queryFn: async () => {
      const response = await service.getReferrals();
      console.log("Full api response", response.data)
      return response.data;
    },
  });
};