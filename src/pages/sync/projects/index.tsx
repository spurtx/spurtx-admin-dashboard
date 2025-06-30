

import { useProjectsData } from '../../../hooks/sync/projects/useProjectsData.ts';
import ProjectCard from '../../../components/sync/projects/ProjectCard';
import ProjectStatus from '../../../components/sync/projects/ProjectStatus';
import ErrorRates from '../../../components/sync/projects/ErrorRates';
import ProjectsTable from '../../../components/sync/projects/ProjectsTable';
import Skeleton from '../../../components/sync/projects/ProjectCardSkeleton.tsx';
import SectionHeading from '../../../components/ui/SectionHeading.tsx';

const Projects = () => {
  const { data: response, isLoading, isError } = useProjectsData();

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
const totalProjects = response?.data?.meta?.totalItems ?? 0;
  const projects = response?.data?.data ?? [];
  return (
    <main>
     <SectionHeading>Projects</SectionHeading>

      {/* Metrics Cards */}
      <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3">
      <ProjectCard 
   projectCount={totalProjects.toLocaleString()}  
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
