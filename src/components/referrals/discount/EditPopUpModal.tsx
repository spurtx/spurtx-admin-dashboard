

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface Referral {
  id: string;
  label: string;
  couponId: string | null;
}

interface EditPopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: Referral;
  onUpdate: (label: string, couponId: string) => void;
position?: { top: number; left: number };
}

const EditPopUpModal = ({ isOpen, onClose, referral, onUpdate, position = { top: 0, left: 0 } }: EditPopUpModalProps) => {
  const [label, setLabel] = useState(referral.label);
  const [selectedCoupon, setSelectedCoupon] = useState(referral.couponId || "");

  const handleSubmit = () => {
    onUpdate(label, selectedCoupon);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="z-50 top-10 right-10 bg-red-500">
      <ModalContent style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateY(10px)'}}>
        <ModalHeader className="font-bold">Edit Referral</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="p-3 border border-green-500 rounded-[13px]">
              <input 
                className="focus:outline-none focus:ring-0 border-none w-full"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            
            <div>
              <p className="text-sm mb-2">Referrer Discount</p>
              <select
                className="w-full text-[12px] py-2 px-2 border border-blue-300 rounded-[2px] focus:outline-blue-500 focus:ring-0"
                value={selectedCoupon}
                onChange={(e) => setSelectedCoupon(e.target.value)}
              >
                <option value="">No Discount</option>
                <option value="mufa">Mufa Group 20% Discount 2024</option>
                <option value="spurt">Spurt! 50% Off</option>
                <option value="womenwork">Womenwork Network 10% Off 2024</option>
                <option value="bujeti">Bujeti 5% Discount 2024</option>
                <option value="sync">Sync 20% Discount</option>
                <option value="gta">Girl Tech Africa 20% Discount</option>
                <option value="latitude59">Latitude59 20% Discount 2023</option>
                <option value="sidebrief">Sidebrief Partnership 2023</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPopUpModal;

