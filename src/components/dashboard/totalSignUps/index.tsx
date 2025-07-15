import BarChart from "../../graphs/BarChart";
import GradientButton from "../../ui/GradientButton";
import CardContainer from "../../ui/CardContainer";
const salesData = [
  120000, 95000, 180000, 300000, 250000, 400000, 280000, 350000, 100000, 220000,
  190000, 370000,
];

const TotalSignUps = () => {
  return (
    <CardContainer>
      <div className="flex justify-between">
        <p className="bg-gradient-to-r text-transparent bg-clip-text from-[#00A15D] to-[#C16407]">
          Total Sign Ups
        </p>
        <div className="flex gap-3">
          <GradientButton
            selectOptions={["Sync!", "Score!", "Spur!", "Spark!", "Spot!"]}
            initialSelected="Score!"
            className="w-25"
          />
          <GradientButton
            selectOptions={["Daily", "Weekly", "Monthly", "Yearly"]}
            initialSelected="Yearly"
            className="w-25"
          />
          <GradientButton
            selectOptions={["Graph", "BarChart"]}
            initialSelected="BarChart"
            className="w-25"
          />
        </div>
      </div>
      <BarChart data={salesData} />
      </CardContainer>
  );
};

export default TotalSignUps;
