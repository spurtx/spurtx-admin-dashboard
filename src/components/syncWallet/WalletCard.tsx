import GradientText from "../ui/GradientText";
import naira from "../../assets/images/svg/naira.svg";

interface CardProps {
  amount: string;
  totalType: string;
  icon: string;
  className?: string;
}

const WalletCard = ({ amount, totalType, icon, className }: CardProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}
    >
      <div className="bg-bg-primary px-3 py-7 rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img src={naira} alt="naira" className="w-3.5 mt-1"/>
            <GradientText className="font-semibold">{amount}</GradientText>
          </div>
          <img src={icon} alt={totalType} className="" />
        </div>
        <p className="text-primary font-semibold mt-2">{totalType}</p>
      </div>
    </div>
  );
};

export default WalletCard;
