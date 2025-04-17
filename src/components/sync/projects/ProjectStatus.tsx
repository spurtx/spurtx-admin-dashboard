import CardContainer from '../../ui/CardContainer';
import ps from "../../../assets/images/svg/ps.svg"
import StatusBar from '../../graphs/StatusBar';


const ProjectStatus = () => {
  return (
    <CardContainer className='h-[400px]'>
        <div className="flex justify-between items-center mb-5">
            <p className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent">Project Status</p>
            <div className="bg-bg-primary h-7 w-7 flex items-center justify-center rounded-[4px]"><img src={ps} className='w-5 h-5' alt="ps-icon" /></div>
        </div>
       
          <div className='w-full'>
          <StatusBar 
           labels={["Total Published", "Total Completed", "Total Closed", "Total in progress", "Total Not Started", "Total Draft"]}
           data={[9600, 10000, 7200, 6000, 10000, 13000]}
           barColor="#00A15D"
           label="Monthly Sales"
          />
          </div>
         
        
    </CardContainer>
  )
}

export default ProjectStatus