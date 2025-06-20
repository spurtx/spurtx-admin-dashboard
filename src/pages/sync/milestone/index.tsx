
import TotalMilestones from '../../../components/sync/milestones/TotalMilestones'
import MilestoneStatus from '../../../components/sync/milestones/MilestoneStatus'
import Rejection from '../../../components/sync/milestones/Rejection'
import MileTable from '../../../components/sync/milestones/MileTable'
import { useMilestonesData } from '../../../hooks/sync/projects/useMilestoneData'
import Skeleton from '../../../components/sync/projects/ProjectCardSkeleton.tsx';

const Milestones = () => {
  const {data: response, isLoading, isError} = useMilestonesData();

  if(isLoading){
    
  }
  return (
    <main>
      <h1 className="font-semibold">Milestones</h1>
      <div>
        <TotalMilestones />
      </div>

      <div className='flex w-full gap-3'>
        <div className="w-1/2">
        <MilestoneStatus />
        </div>
        <div className='w-1/2'>
          <Rejection />
        </div>
      </div>
      <MileTable />

    </main>
  )
}

export default Milestones