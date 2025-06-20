// components/common/Pagination.tsx
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  return (
    <div className={`flex justify-between items-center mt-4 ${className}`}>
      <div>
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-5 rounded-[13px] border border-gray-300 shadow-md px-1 py-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="cursor-pointer"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};