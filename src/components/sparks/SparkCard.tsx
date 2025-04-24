import GradientText from "../ui/GradientText";

interface SparkCardProps {
    totalName: string;
    totalValue: string;
    icon: string;
    className?: string;
}

const SparkCard = ({totalName, totalValue, icon, className}: SparkCardProps) => {
  return (
    <div className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}>
        <div  className="bg-bg-primary px-3 py-4 rounded-md space-y-1">
            <div className="flex gap-3 items-center text-primary">
                <p className="font-semibold">{totalName}</p>
                <img src={icon} alt={totalName} className="w-5 h-5"/>
                
            </div>
            <GradientText className="font-bold inline-block">{totalValue}</GradientText>
        </div>
    </div>
  )
}

export default SparkCard;