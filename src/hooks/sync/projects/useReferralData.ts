// import { useQuery } from "@tanstack/react-query";
// import createReferralService from "../../../services/sync/referralService";
// import { useApi } from "../../useApi";

// export const useReferralsData = () => {
//   const { api } = useApi();
//   const service = createReferralService({ api });

// //   return useQuery({
// //     queryKey: ['referrals'],
// //     queryFn: async () => {
// //       const response = await service.getReferrals();
// //       console.log("Full referral data response", response.data)
// //       return response.data;
// //     },
// //   });
// // };

// return useQuery({
//   queryKey: ['referrals'],
//   queryFn: async () => {
//     try {
//       const response = await service.getReferrals();
//       console.log("Full referral data response", response.data);
//       return response.data;
//     } catch (err) {
//       console.error("Error fetching referrals:", err);
//       throw err;
//     }
//   },
// })
// };

// // src/hooks/sync/projects/useReferralData.ts
// import { useQuery } from "@tanstack/react-query";
// import createReferralService from "../../../services/sync/referralService";
// import { useApi } from "../../useApi";
// import { Referral, ReferralResponse } from "../../../types/api";

// // Hook for DiscountTable (expects full response object)
// export const useReferralResponse = () => {
//   const { api } = useApi();
//   const service = createReferralService({ api });

//   return useQuery<ReferralResponse>({
//     queryKey: ['referrals-response'],
//     queryFn: async () => {
//       try {
//         const response = await service.getReferrals();
//         console.log("Referral response data", response);
//         return response;
//       } catch (err) {
//         console.error("Error fetching referrals:", err);
//         throw err;
//       }
//     },
//   });
// };

// // Hook for TopReferees (expects referral array)
// export const useReferralArray = () => {
//   const { api } = useApi();
//   const service = createReferralService({ api });

//   return useQuery<Referral[]>({
//     queryKey: ['referrals-array'],
//     queryFn: async () => {
//       try {
//         const response = await service.getReferrals();
        
//         // Handle API response format
//         if (Array.isArray(response)) return response;
//         if (response && Array.isArray(response.data)) return response.data;
//         if (response?.data && Array.isArray(response.data.data)) return response.data.data;
        
//         console.error("Unexpected API response format", response);
//         return [];
//       } catch (err) {
//         console.error("Error fetching referrals:", err);
//         throw err;
//       }
//     },
//   });
// };

// src/hooks/sync/projects/useReferralData.ts
import { useQuery } from "@tanstack/react-query";
import createReferralService from "../../../services/sync/referralService";
import { useApi } from "../../useApi";
import { Referral, ReferralResponse } from "../../../types/api";

// Hook for DiscountTable (expects full response object)
export const useReferralResponse = () => {
  const { api } = useApi();
  const service = createReferralService({ api });

  return useQuery<ReferralResponse>({
    queryKey: ['referrals-response'],
    queryFn: async () => {
      try {
        const response = await service.getReferrals();
        console.log("Referral response data", response);
        return response;
      } catch (err) {
        console.error("Error fetching referrals:", err);
        throw err;
      }
    },
  });
};

// Hook for TopReferees (expects referral array)
export const useReferralArray = () => {
  const { api } = useApi();
  const service = createReferralService({ api });

  return useQuery<Referral[]>({
    queryKey: ['referrals-array'],
    queryFn: async () => {
      try {
        const response = await service.getReferrals();
        
        // Handle API response format
        // Case 1: Response is already an array of referrals
        if (Array.isArray(response)) {
          return response;
        }
        
        // Case 2: Response is a ReferralResponse object
        if (response && 'data' in response && Array.isArray(response.data)) {
          return response.data;
        }
        
        // Case 3: Response has nested data property (rare case)
        if (response && 'data' in response && response.data && 
            'data' in response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        
        console.error("Unexpected API response format", response);
        return [];
      } catch (err) {
        console.error("Error fetching referrals:", err);
        throw err;
      }
    },
  });
};