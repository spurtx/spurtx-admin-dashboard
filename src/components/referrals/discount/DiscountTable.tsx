
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Line } from "react-icons/ri";
import GradientDots from "../../ui/GradientDots";
import { useToast } from '@chakra-ui/react';
import createReferralService from '../../../services/sync/referralService';
import { useApi } from '../../../hooks/useApi';
import EditPopUpModal from './EditPopUpModal';

interface Referral {
  id: string;
  label: string;
  frequency: number;
  code: string;
  pageVisit: number;
  couponId: string | null;
  signUps?: number;
}

const DiscountTable = () => {
  const [addReferral, setAddReferral] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { api } = useApi();
  const referralService = createReferralService({ api });

  // Using useQuery instead of useReferralsData hook
  const { data: referralsData, isLoading, isError } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => referralService.getReferrals().then(res => res.data),
  });

  const [referrals, setReferrals] = useState<Referral[]>([]);

  // Update local state when data loads
  useEffect(() => {
    if (referralsData) {
      setReferrals(referralsData);
    }
  }, [referralsData]);

  const handleAddReferral = async () => {
    if (!addReferral.trim()) return;

    setIsSubmitting(true);
    
    try {
      const newReferral = {
        label: addReferral,
        frequency: 0,
        code: generateRandomCode(),
        pageVisit: 0,
        couponId: selectedCoupon || null,
        signUps: 0
      };

      // Optimistic UI update
      const tempReferral = {
        ...newReferral,
        id: `temp-${Date.now()}`
      };
      setReferrals(prev => [tempReferral, ...prev]);

      // Make API call
      const createdReferral = await referralService.addReferral(newReferral);

      // Replace temporary referral with actual one from backend
      setReferrals(prev => [
        createdReferral,
        ...prev.filter(r => r.id !== tempReferral.id)
      ]);

      // Show success toast
      toast({
        title: 'Referral added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setAddReferral("");
      setSelectedCoupon("");

    } catch (error) {
      // Remove the temporary referral if the API call fails
      setReferrals(prev => prev.filter(r => !r.id.startsWith('temp-')));
      
      toast({
        title: 'Error adding referral',
        description: 'Failed to add referral. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateRandomCode = () => {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return (
      "REF" +
      Array.from({ length: 5 }, () =>
        randomChars[Math.floor(Math.random() * randomChars.length)]
      ).join("")
    );
  };

  if (isLoading) return <div>Loading referrals...</div>;
  if (isError) return <div>Error loading referrals</div>;

  return (
    <div className="overflow-x-auto my-4 bg-white shadow-md">
      <div className="flex gap-5 items-center bg-white rounded-[2px] px-3 py-2 border border-gray-300 my-2">
        {/* Referrer Input */}
        <div className="w-1/2">
          <input
            className="text-[#999999] text-[12px] py-1 px-3 w-full focus:outline-none focus:ring-0 border-none"
            placeholder="Add to Referrer list"
            value={addReferral}
            onChange={(e) => setAddReferral(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddReferral()}
          />
        </div>

        {/* Dropdown and Submit Button */}
        <div className="flex items-center gap-2 w-1/2">
          <select
            className="text-[#000000] w-[90%] text-[12px] py-2 px-2 border border-blue-300 rounded-[2px] focus:outline-blue-500 focus:ring-0"
            value={selectedCoupon}
            onChange={(e) => setSelectedCoupon(e.target.value)}
          >
            <option value="">Referrer Discount</option>
            <option value="mufa">Mufa Group 20% Discount 2024</option>
            <option value="spurt">Spurt! 50% Off</option>
            <option value="womenwork">Womenwork Network 10% Off 2024</option>
            <option value="bujeti">Bujeti 5% Discount 2024</option>
            <option value="sync">Sync 20% Discount</option>
            <option value="gta">Girl Tech Africa 20% Discount</option>
            <option value="latitude59">Latitude59 20% Discount 2023</option>
            <option value="sidebrief">Sidebrief Partnership 2023</option>
          </select>

          <button 
            className={`${isSubmitting ? 'bg-gray-300' : 'bg-[#DCDCDC]'} text-[#6E6E6E] py-2 px-2 rounded-[2px] text-[14px]`}
            onClick={handleAddReferral}
            disabled={!addReferral.trim() || isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </div>
      
      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
          <tr>
            <th className="py-3 px-2">S/N</th>
            <th className="px-5 text-start">Label</th>
            <th className="px-5 text-start">Code</th>
            <th className="px-5 text-start">Stripe Coupon</th>
            <th className="px-5 text-start">Sign Ups</th>
            <th className="px-5 text-start">Page Visits</th>
            <th className="px-5 text-start">Subscription</th>
            <th className="px-5"></th>
            <th className="px-5"></th>
          </tr>
        </thead>
        <tbody>
          {referrals?.map((referral, index) => (
            <tr key={referral.id}>
              <td className="p-2 text-gray-500 text-[13px] font-semibold">
                {(index + 1).toString().padStart(2, "0")}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.label}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.code || "N/A"}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.couponId || "N/A"}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.signUps ?? referral.frequency}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.pageVisit}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {referral.couponId ? "Active" : "Inactive"}
              </td>
              <td className="py-2 px-5 text-center">
                <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
              </td>
              <td className="py-2 px-5 text-center">
                <GradientDots />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
