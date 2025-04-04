import dash from "../../../assets/images/svg/dash-icon.svg";
import GradientButton from "../../ui/GradientButton";
import LineCurveRef from "../../graphs/LineCurveRef";

const MostReferrals = () => {
  return (
    <div className="w-full bg-white p-3 border border-gray-300 rounded-md mt-3">
      <div className="flex justify-between">
        <div>
          <GradientButton
            selectOptions={[
              "1st Quarter",
              "2nd Quarter",
              "3rd Quarter",
              "4th Quarter",
            ]}
            initialSelected="3rd Quarter"
            className="w-31"
          />
        </div>
        <div className="flex gap-2">
          <GradientButton
            selectOptions={["2024", "2023", "2022", "2021"]}
            initialSelected="2024"
            className="w-18"
          />
          <div className="bg-[#EEFFF8] px-2 py-1 flex items-center justify-center rounded-[7px]">
            <img src={dash} alt="dash" className="" />
          </div>
        </div>
      </div>

      <div className="flex mt-5 ">
        <div className="space-y-3 w-[20%]">
          <div className="">
            <p className="text-[20px] font-bold bg-gradient-to-r text-transparent bg-clip-text from-[#00A15D] to-[#C16407] inline-block">
              1,000
            </p>
            <p>Total Referred</p>
          </div>
          <div className="">
            <p className="text-[20px] font-bold bg-gradient-to-r text-transparent bg-clip-text from-[#00A15D] to-[#C16407] inline-block">
              Sep
            </p>
            <p>Most Referrals</p>
          </div>
        </div>
        <div style={{ width: "500px", height: "300px" }} className="w-[80%]">
      <LineCurveRef
        labels={[
          "Jul Start", "Jul End", 
          "Aug Start", "Aug End", 
          "Sep Start", "Sep End"
        ]}
        dataPoints={[
          9500, 10000,  // Jul (Start → End)
          10000, 10700, // Aug (Start → End)
          10500, 9500  // Sep (Start → End)
        ]}
      />
    </div>
      </div>
    </div>
  );
};

export default MostReferrals;
