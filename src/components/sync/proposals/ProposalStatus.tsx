import CardContainer from '../../ui/CardContainer'
import GradientText from '../../ui/GradientText'
import StatusBar from '../../graphs/StatusBar';
import ps from "../../../assets/images/svg/ps.svg";

const ProposalStatus = () => {
  return (
   <CardContainer className="h-[350px]">
    <div className="flex justify-between mb-4">
        <GradientText>Proposal Status</GradientText>
        <div className="bg-bg-primary h-7 w-7 flex items-center justify-center rounded-[4px]"><img src={ps} className='w-5 h-5' alt="ps-icon" /></div>
    </div>
    <div className='w-full'>
          <StatusBar 
           labels={["Total Accepted", "Total Rejected", "Total Pending",]}
           data={[9000, 7000, 5000, 8200, 1500]}
           barColor="#00A15D"
           label="Monthly Sales"
          />
          </div>
   </CardContainer>
  )
}

export default ProposalStatus