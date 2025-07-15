import GradientText from "../../ui/GradientText";

interface TaskProps {
  taskValue: string;
  taskType: string;
  className?: string;
}

const TaskCard = ({ taskValue, taskType, className }: TaskProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px] ${className}`}
    >
      <div className="bg-bg-primary px-3 py-4 rounded-md">
        <GradientText className="font-semibold">{taskValue}</GradientText>
        <p className="text-primary font-semibold">{taskType}</p>
      </div>
    </div>
  );
};

export default TaskCard;
