import React from "react";
import { Link } from "react-router";
import Subscription from "../../components/dashboard/subscription";
import RefundValue from "../../components/dashboard/refundValue";
import ActiveUsers from "../../components/dashboard/activeUsers";
import VerifiedUsers from "../../components/dashboard/verifiedUser";
import TotalSignUps from "../../components/dashboard/totalSignUps";
import ArrowRight from "../../components/ui/ArrowRight";
import ProductUsers from "../../components/dashboard/productUsers";


const Dashboard: React.FC = () => {

 
  
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Dashboard</h1>
       <Link to="/dashboard/referrals"><p className="flex gap-1 items-center bg-gradient-to-r cursor-pointer from-[#00A15D] to-[#C16407] bg-clip-text text-transparent">
          Referals{" "}
          <ArrowRight />
        </p>
        </Link> 
      </div>

      <div className="w-full flex gap-2 mt-3">
        <div className="w-[70%]">
          <Subscription />
        </div>
        <div className="w-[30%]">
          <RefundValue />
        </div>
      </div>
      <div className="mt-2">
        <ActiveUsers />
      </div>
      <VerifiedUsers />
      <TotalSignUps />
      <ProductUsers />
     
    </div>
  );
};

export default Dashboard;
