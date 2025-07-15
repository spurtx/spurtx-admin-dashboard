import SectionHeading from "../../components/ui/SectionHeading";
import surveyIcon from "../../assets/images/svg/survey-icon.svg";
import CardContainer from "../../components/ui/CardContainer";
import SurveySection from "../../components/templates/surveyTemplates/SurveySection";
import AppraisalSection from "../../components/templates/surveyTemplates/AppraisalSection";

const Templates = () => {
  const templateIcons = Array(5).fill(surveyIcon);

  return (
    <main className="w-full p-4">
      {/* Top Heading and Create Button */}
      <div className="w-full flex justify-between items-center mb-6">
        <SectionHeading>Templates</SectionHeading>
        <button
          type="button"
          className="w-36 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-md mt-1 font-semibold cursor-pointer disabled:opacity-60"
        >
          Create+
        </button>
      </div>
      <div className="w-full space-y-7">
        <SurveySection />
        <AppraisalSection />
      </div>
    </main>
  );
};

export default Templates;
