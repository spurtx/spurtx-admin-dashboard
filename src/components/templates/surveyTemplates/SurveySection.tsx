import SectionHeading from "../../ui/SectionHeading";
import GradientText from "../../ui/GradientText";
import CardContainer from "../../ui/CardContainer";
import DashedGradientBox from "../../ui/DashedGradientBox";

const SurveySection = () => {
  return (
    <section className="w-full">
      <SectionHeading>Survey Templates</SectionHeading>
      <CardContainer className="">
        {/* <div className="bg-gradient-to-r w-36.5 from-[#00A15D] to-[#C16407] rounded-[5px] p-[1.2px] border-dashed"><div className='bg-white w-36 flex justify-center rounded-[5px] py-1 border-dashed'><GradientText>+Create</GradientText></div></div> */}
        <DashedGradientBox>
          <GradientText>+Create</GradientText>
        </DashedGradientBox>
      </CardContainer>
    </section>
  );
};

export default SurveySection;
