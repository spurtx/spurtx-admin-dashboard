import CardContainer from '../../ui/CardContainer';
import MinimalDoughnutChart from '../../graphs/MinimalDoughnutChart';

const ErrorRates = () => {
  return (
    <CardContainer className='h-[400px] flex flex-col justify-between'>
        <p className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent">Projects Error Rates</p>
        <div className="h-[180px] w-[120px] flex justify-center mx-auto items-center ">
        <MinimalDoughnutChart data={[85, 15]} colors={["#00A15D", "#BF6408"]}/>
        </div>
        <div className="bg-white shadow-md w-50 flex flex-col items-center mx-auto">
            <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#BF6408]"></div><span className="text-[#A3AED0] font-semibold]">Error Rates</span></div>
            <p className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent font-semibold">5%</p>
        </div>
    </CardContainer>
  )
}

export default ErrorRates;