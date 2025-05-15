

import { useProjectMetrics } from '../../../hooks/sync/projects/useProjectMetrics.ts';
import ProjectCard from '../../../components/sync/projects/ProjectCard';
import ProjectStatus from '../../../components/sync/projects/ProjectStatus';
import ErrorRates from '../../../components/sync/projects/ErrorRates';
import ProjectsTable from '../../../components/sync/projects/ProjectsTable';
import Skeleton from '../../../components/sync/projects/ProjectCardSkeleton.tsx';

const Projects = () => {
  const { data: totalProjects, isLoading, isError } = useProjectMetrics();

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading project metrics</div>;
  }

  return (
    <main>
      <h1 className="font-semibold">Projects</h1>

      {/* Metrics Cards */}
      <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
      <ProjectCard 
  projectCount={totalProjects?.toLocaleString() || '0'} 
  type="Total Projects Counted"
/>
        <ProjectCard 
          projectCount={'1,024'} // Rough estimate / mock
          type="Total Invitations Sent"
        />
        <ProjectCard 
          projectCount={'3'} 
          rate="/per project" 
          type="Avg. team member"
        />
        <ProjectCard 
          projectCount={'1'} 
          rate="/per project" 
          type="Avg. member removed"
        />
        <ProjectCard 
          projectCount={'18 days'} 
          type="Avg. completion days"
        />
      </div>

      {/* Charts Section */}
      <div className="flex w-full gap-3 mt-6">
        <div className="w-[65%] min-h-[300px]">
          <ProjectStatus />
        </div>
        <div className="w-[35%] min-h-[300px]">
          <ErrorRates />
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-6">
        <ProjectsTable />
      </div>
    </main>
  );
};

export default Projects;
