import CardContainer from "../../ui/CardContainer";
import DonutChart from "../../graphs/DonutChart";

const Rejection = () => {
  return (
    <CardContainer className="h-[320px]">
        <h1 className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent inline-block font-semibold">Milestone Rejection/Acceptance Rates</h1>
        <div className="flex justify-center items-center gap-20 mt-20">
      <div className="w-30 h-30 flex flex-col justify-center items-center">
        <DonutChart value={60} backgroundColor={["#00A15D", "#5B93FF"]} />
        <span className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent inline-block font-semibold mt-4">Acceptance</span>
      </div>
      <div className="w-30 h-30 flex flex-col justify-center items-center">
        <DonutChart value={40} backgroundColor={["#00A15D", "#5B93FF"]} />
        <span className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent inline-block font-semibold mt-4">Rejection</span>
      </div>
      </div>
    </CardContainer>
  );
};

export default Rejection;
