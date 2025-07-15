import StatusBar from "../graphs/StatusBar";
import CardContainer from "../ui/CardContainer";
import GradientText from "../ui/GradientText";

const SparkBars = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-3 mt-3">
      <CardContainer>
        <GradientText className="font-semibold mb-5">
          Most Awarded Departments
        </GradientText>
        <StatusBar
          labels={["HR Team", "Design", "Dev Team", "Marketing", "Finance"]}
          data={[900, 300, 100, 80, 20]}
          barColor="#00A15D"
          label="Monthly Sales"
        />
      </CardContainer>

      <CardContainer>
        <GradientText className="font-semibold mb-5">
          Most Rewarded Departments
        </GradientText>
        <StatusBar
          labels={["HR Team", "Design", "Dev Team", "Marketing", "Finance"]}
          data={[900, 300, 100, 80, 20]}
          barColor="#00A15D"
          label="Monthly Sales"
        />
      </CardContainer>
      <CardContainer>
        <GradientText className="font-semibold mb-5">
          Most Flagged Departments
        </GradientText>
        <StatusBar
          labels={["HR Team", "Design", "Dev Team", "Marketing", "Finance"]}
          data={[900, 300, 100, 80, 20]}
          barColor="#C16407"
          label="Monthly Sales"
        />
      </CardContainer>
      
    </div>
  );
};

export default SparkBars;
