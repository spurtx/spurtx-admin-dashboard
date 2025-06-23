import { MdSort } from "react-icons/md";

interface SortButtonProps {
  onClick: () => void;
  className?: string;
}

export const SortButton = ({ onClick, className = "" }: SortButtonProps) => {
  return (
    <button 
      className={`flex gap-2 border items-center px-3 cursor-pointer border-gray-300 text-gray-400 rounded-[3px] ${className}`}
      onClick={onClick}
    >
      <MdSort />
      Sort Table
    </button>
  );
};