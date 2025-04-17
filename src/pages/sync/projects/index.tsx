import React from 'react'
import ProjectCard from '../../../components/sync/projects/ProjectCard';
import ProjectStatus from '../../../components/sync/projects/ProjectStatus';
import ErrorRates from '../../../components/sync/projects/ErrorRates';

const Projects = () => {
  return (
    <main>
      <h1 className="font-semibold">Projects</h1>
      <div className="w-full grid grid-cols-5 gap-5 bg-white p-5 rounded-[7px] shadow-lg mt-3" >
        <ProjectCard projectCount="40,000" type="Total Projects Counted"/>
        <ProjectCard projectCount="40,000" type="Total Invitation sent"/>
        <ProjectCard projectCount="12" rate='/per project' type="Avg. team member"/>
        <ProjectCard projectCount="4" rate="/per project" type="Avg. member removed"/>
        <ProjectCard projectCount="30 days" type="Avg. completion days"/>
      </div>

      <div className="flex w-full gap-3">
        <div className="w-[65%] min-h-[300px]">
        <ProjectStatus />
        </div>
        <div className="w-[35%] min-h-[300px]">
          <ErrorRates />
        </div>
      </div>

    </main>
  )
}

export default Projects;