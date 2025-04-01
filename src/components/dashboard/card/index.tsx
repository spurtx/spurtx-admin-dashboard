import React from "react";
import arrow from "../../../assets/images/svg/arrow.svg";

interface DashCardProps {
  totalUsers: string;
  percentage: number;
  name: string;
  className?: string;

}

const DashCard: React.FC<DashCardProps> = ({
  totalUsers,
  percentage,
  name,
  className,
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}
    >
      <div className="px-4 h-19 flex justify-between items-center bg-[#EEFFF8] rounded-md">
        <div>
          <p className="flex flex-col gap-2">
            <span className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent font-semibold">
              {totalUsers}
            </span>
            <span className="text-[#00A15D]">{name}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <img src={arrow} alt="arrow" className="h-7 w-7" />
          <p className="text-[#00A15D]">+{percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default DashCard;
