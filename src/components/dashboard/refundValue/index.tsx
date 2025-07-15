
import PieChart from '../../graphs/PieChart'
import DoughnutLayout from './DoughnutLayout';
import GradientButton from '../../ui/GradientButton';

const RefundValue = () => {
  return (
    <div className="bg-white p-3 border border-gray-300 rounded-md">
        <div className="flex justify-between">
            <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text font-semibold">Total Refund Value</p>
            <GradientButton selectOptions={["Daily", "Weekly", "Monthly", "Yearly"]} initialSelected="Yearly" className="w-20"/>
        </div>
        <div className="flex justify-between my-8">
            <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text font-semibold">$200,000.00</p>
            <GradientButton selectOptions={["2024", "2023", "2022", "2021"]} initialSelected="2024" className="w-18"/>
        </div>
        <div className="w-full flex justify-center my-10">
        <PieChart value="12.4"/>
        </div>
        <div className="grid grid-cols-5 gap-3">
        <DoughnutLayout productName="Sync!" value={40} backgroundColor={["#E9FAF4", "#C16407"]} priceValue='5'/>
        <DoughnutLayout productName="Spot!" value={20} backgroundColor={["#E9FAF4", "#00A15D"]} priceValue='5'/>
        <DoughnutLayout productName="Spark!" value={58} backgroundColor={["#E9FAF4", "#D0D0D0"]} priceValue='5'/>
        <DoughnutLayout productName="Score!" value={28} backgroundColor={["#E9FAF4", "#34C759"]} priceValue='5'/>
        <DoughnutLayout productName="Spur!" value={64} backgroundColor={["#E9FAF4", "#C16407"]} priceValue='5'/>
        </div>
    </div> 
  )
}

export default RefundValue;