const ProjectCardSkeleton = () => {
    return (
      <div className="bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px]">
        <div className="bg-bg-primary px-3 py-4 rounded-md space-y-2">
          {/* Main count skeleton */}
          <div className="bg-gradient-to-r from-[#00A15D] to-[#C16407] h-6 w-3/4 rounded-md opacity-20" />
          
          {/* Rate skeleton (if exists) */}
          <div className="h-4 w-1/4 rounded-md bg-gray-200 opacity-20" />
          
          {/* Type skeleton */}
          <div className="h-4 w-1/2 rounded-md bg-[#00A15D] opacity-20" />
        </div>
      </div>
    );
  };
  
  export default ProjectCardSkeleton;