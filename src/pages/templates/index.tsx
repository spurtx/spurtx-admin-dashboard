import SectionHeading from "../../components/ui/SectionHeading";
import surveyIcon from "../../assets/images/svg/survey-icon.svg";
import CardContainer from "../../components/ui/CardContainer";

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

      {/* Survey Templates Section */}
      <CardContainer>
        <h2 className="text-xl font-semibold mb-4">Survey Templates</h2>
        <div className="grid grid-cols-5 gap-4">
          {templateIcons.map((icon, index) => (
            <img
              key={`survey-${index}`}
              src={icon}
              alt="Survey Template Icon"
              className="w-60 h-60"
            />
          ))}
        </div>
      </CardContainer>

      {/* Appraisal Templates Section */}
      <CardContainer>
        <h2 className="text-xl font-semibold mb-4">Appraisal Templates</h2>
        <div className="grid grid-cols-5 gap-4">
          {templateIcons.map((icon, index) => (
            <img
              key={`appraisal-${index}`}
              src={icon}
              alt="Appraisal Template Icon"
              className="w-60 h-60"
            />
          ))}
        </div>
      </CardContainer>

      {/* Job Listing Templates Section */}
      <CardContainer>
        <h2 className="text-xl font-semibold mb-4">Job Listing Templates</h2>
        <div className="grid grid-cols-5 gap-4">
          {templateIcons.map((icon, index) => (
            <img
              key={`job-${index}`}
              src={icon}
              alt="Job Listing Template Icon"
              className="w-60 h-60"
            />
          ))}
        </div>
      </CardContainer>
    </main>
  );
};

export default Templates;
