import CardContainer from "../../components/ui/CardContainer";
import GradientText from "../../components/ui/GradientText";
import GradientButton from "../ui/GradientButton";
import vecc from "../../assets/images/svg/vecc.svg";
import StatusBar from "../graphs/StatusBar";

const JobList = () => {
  return (
    <CardContainer className="h-[370px]">
      <div className="flex items-center justify-between">
        <GradientText className="">Job listing posted</GradientText>
        <div className="flex gap-3 items-center">
          <GradientButton
            selectOptions={["Daily", "Weekly", "Monthly", "Yearly"]}
            initialSelected="Yearly"
            className="w-30"
          />
          <div className="bg-bg-primary h-7 w-7 flex items-center justify-center rounded-[4px]"><img src={vecc} className='w-5 h-5' alt="ps-icon" /></div>
        </div>
      </div>
      <div>
      <StatusBar
          labels={["Jan", "Feb", "Mar", "Apri", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
          data={[900, 300, 100, 260, 460, 500, 345, 570, 290, 480,780,840, ]}
          barColor="#00A15D"
          label="Monthly Sales"
        />
      </div>
    </CardContainer>
  );
};

export default JobList;
