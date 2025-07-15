import GradientText from "../ui/GradientText";

interface CardProps {
    appraisalCount: string;
    type: string;
    rate?: string;
    className?: string;

}

const SpurCard = ({appraisalCount, type, className, rate}: CardProps) => {
  return (
    <div className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}>
        <div className="bg-bg-primary px-3 py-4 rounded-md">
            <GradientText className="font-semibold mb-2 inline-block">
                {appraisalCount}<span className="text-xs">{rate}</span>
            </GradientText>
            <p className="text-[#00A15D] font-semibold text-[14px]">{type}</p>
        </div>

    </div>
  )
}

export default SpurCard;