
import { MdOutlineCloudUpload } from "react-icons/md";

interface ExportButtonProps {
  onClick: () => void;
  className?: string;
}

export const ExportButton = ({ onClick, className = "" }: ExportButtonProps) => {
  return (
    <button 
      className={`flex gap-2 border cursor-pointer items-center px-3 border-gray-300 text-gray-400 rounded-[3px] ${className}`}
      onClick={onClick}
    >
      <MdOutlineCloudUpload />
      Export
    </button>
  );
};