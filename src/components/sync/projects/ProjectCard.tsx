
interface CardProps {
    projectCount: string;
    type: string;
    rate?: string;
    className?: string;

}

const ProjectCard = ({projectCount, type, className, rate}: CardProps) => {
  return (
    <div className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}>
        <div className="bg-bg-primary px-3 py-4 rounded-md">
            <p className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent font-semibold inline-block">
                {projectCount}<span className="text-xs">{rate}</span>
            </p>
            <p className="text-[#00A15D] font-semibold text-[15px]">{type}</p>
        </div>

    </div>
  )
}

export default ProjectCard