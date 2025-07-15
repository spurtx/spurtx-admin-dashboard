import React from "react";
import GradientButton from "../../ui/GradientButton";
import LineCurveOne from "../../graphs/LineCurveOne";
import SubCard from "./SubCard";

const Subscription: React.FC = () => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text font-semibold">
          Total Subscription Value
        </p>
        <GradientButton
          selectOptions={["Daily", "Weekly", "Monthly", "Yearly"]}
          initialSelected="Yearly"
          className="w-30"
        />
      </div>
      <div className="flex justify-between my-5">
        <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text font-semibold">
          $200,000.00
        </p>
        <GradientButton
          selectOptions={["2024", "2023", "2022", "2021"]}
          initialSelected="2024"
          className="w-25"
        />
      </div>

      <div>
         <LineCurveOne
          labels={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          dataPoints={[
            90000, 210000, 180000, 280000, 250000, 180000, 140000, 180000, 160000,
            260000, 290000, 210000,
          ]}
          gradientStart="rgba(0, 161, 93, 1)"
          gradientEnd="rgba(193, 100, 7, 1)"
        />
      

      </div>
      <div className="grid grid-cols-5 gap-5 mt-3">
        <SubCard totalCost="20,000" productName="Sync!" />
        <SubCard totalCost="56,000" productName="Score" />
        <SubCard totalCost="34,000" productName="Spur!" />
        <SubCard totalCost="30,000" productName="Spot!" />
        <SubCard totalCost="20,000" productName="Spark!" />
      </div>
    </div>
  );
};

export default Subscription;
