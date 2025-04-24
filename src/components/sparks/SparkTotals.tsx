import SparkCard from "./SparkCard";
import spa1 from "../../assets/images/svg/spa1.svg"
import spa2 from "../../assets/images/svg/spa2.svg"
import spa3 from "../../assets/images/svg/spa3.svg"
import spa4 from "../../assets/images/svg/spa4.svg"
import spa5 from "../../assets/images/svg/spa5.svg"


const SparkTotals = () => {
  return (
    <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
        <SparkCard icon={spa1} totalName="Total Sparks" totalValue="12,000" />
        <SparkCard icon={spa2} totalName="Total Awards" totalValue="5,000" />
        <SparkCard icon={spa3} totalName="Total Rewards" totalValue="6,000" />
        <SparkCard icon={spa4} totalName="Total Gifts" totalValue="1,000" />
        <SparkCard icon={spa5} totalName="Total Flags" totalValue="2,000" />

    </div>
  )
}

export default SparkTotals