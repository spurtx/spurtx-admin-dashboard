

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

interface ReferralResponse {
  data: Referral[];
}

const DiscountTable = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { api } = useApi();
  const referralService = createReferralService({ api });

  // State management
  const [addReferral, setAddReferral] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });

  // Fetch referrals data
  const { data: referralResponse, isLoading, isError } = useQuery<ReferralResponse>({
    queryKey: ['referrals'],
    queryFn: () => referralService.getReferrals(),
  });

  // Extract referrals array from response
  const referrals = referralResponse?.data || [];

  // Add referral mutation
  const addMutation = useMutation({
    mutationFn: (newReferral: Omit<Referral, 'id'>) => 
      referralService.addReferral(newReferral),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: 'Referral added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error adding referral',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  // Update referral mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, label, couponId }: { id: string; label: string; couponId: string | null }) =>
      referralService.updateReferral(id, {
        label,
        frequency: selectedReferral?.frequency || 0,
        couponId: couponId || undefined
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: 'Referral updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error updating referral',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  // Delete referral mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => referralService.deleteReferral(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: 'Referral deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error deleting referral',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  // Handlers
 const handleGradientDotsClick = (referral: Referral, e: React.MouseEvent<HTMLDivElement>) => {
  
  setSelectedReferral(referral);
  setIsModalOpen(true);
  
  // Get the position of the clicked element
  const rect = e.currentTarget.getBoundingClientRect();
  setClickPosition({
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX + rect.width
  });
};

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedReferral(null);
  };

  const handleUpdateReferral = (updatedLabel: string, updatedCouponId: string) => {
    if (!selectedReferral) return;
    updateMutation.mutate({
      id: selectedReferral.id,
      label: updatedLabel,
      couponId: updatedCouponId || null
    });
    handleModalClose();
  };

  const handleAddReferral = () => {
    if (!addReferral.trim()) return;

    const newReferral: Omit<Referral, 'id'> = {
      label: addReferral,
      frequency: 0,
      code: generateRandomCode(),
      pageVisit: 0,
      couponId: selectedCoupon || null,
      signUps: 0
    };

    addMutation.mutate(newReferral);
    setAddReferral("");
    setSelectedCoupon("");
  };

  const handleDeleteReferral = (id: string) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      deleteMutation.mutate(id);
    }
  };

  const generateRandomCode = () => {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return "REF" + Array.from({ length: 5 }, () =>
      randomChars[Math.floor(Math.random() * randomChars.length)]
    ).join("");
  };



  if (isLoading) return <div>Loading referrals...</div>;
  if (isError) return <div>Error loading referrals</div>;

  return (
    <div className="overflow-x-auto my-4 bg-white shadow-md relative">
      {/* Add Referral Form */}
      <div className="flex gap-5 items-center bg-white rounded-[2px] px-3 py-2 border border-gray-300 my-2">
        <div className="w-1/2">
          <input
            className="text-[#999999] text-[12px] py-1 px-3 w-full focus:outline-none focus:ring-0 border-none"
            placeholder="Add to Referrer list"
            value={addReferral}
            onChange={(e) => setAddReferral(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddReferral()}
          />
        </div>
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
            className={`${addMutation.isPending ? 'bg-gray-300' : 'bg-[#DCDCDC]'} text-[#6E6E6E] py-2 px-2 rounded-[2px] text-[14px]`}
            onClick={handleAddReferral}
            disabled={!addReferral.trim() || addMutation.isPending}
          >
            {addMutation.isPending ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </div>
      
      {/* Referrals Table */}
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
          {referrals.map((referral, index) => (
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
                <RiDeleteBin6Line 
                  className="text-red-500 cursor-pointer" 
                  onClick={() => handleDeleteReferral(referral.id)}
                />
              </td>
              <td className="py-2 px-5 text-center">
                <div 
                  className="cursor-pointer" 
                  onClick={(e) => handleGradientDotsClick(referral, e)}
                >
                  <GradientDots />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedReferral && (
        <div className='bg-black'>
        <EditPopUpModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose}
          referral={selectedReferral}
          onUpdate={handleUpdateReferral}
          position={clickPosition}
        />
        </div>
      )}
    </div>
  );
};

export default DiscountTable;
