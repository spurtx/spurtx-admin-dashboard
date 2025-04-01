import React from "react";
import Subscription from "../../components/dashboard/subscription";
import RefundValue from "../../components/dashboard/refundValue";
import ActiveUsers from "../../components/dashboard/activeUsers";
import VerifiedUsers from "../../components/dashboard/verifiedUser";
import TotalSignUps from "../../components/dashboard/totalSignUps";


const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Dashboard</h1>
        <p className="flex gap-1 items-center bg-gradient-to-r cursor-pointer from-[#00A15D] to-[#C16407] bg-clip-text text-transparent">
          Referals{" "}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#00A15D", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#C16407", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M9 18l6-6-6-6"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
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
     
    </div>
  );
};

export default Dashboard;
