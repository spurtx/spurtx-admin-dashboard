// // components/common/Pagination.tsx
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   className?: string;
// }

// export const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   className = "",
// }: PaginationProps) => {
//   return (
//     <div className={`flex justify-between items-center mt-4 ${className}`}>
//       <div>
//         Showing page {currentPage} of {totalPages}
//       </div>
//       <div className="flex gap-5 rounded-[13px] border border-gray-300 shadow-md px-1 py-1">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="cursor-pointer"
//         >
//           <IoIosArrowBack />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage >= totalPages}
//           className="cursor-pointer"
//         >
//           <IoIosArrowForward />
//         </button>
//       </div>
//     </div>
//   );
// };

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
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <IoIosArrowBack />
        </button>
        
        <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
          {currentPage}
        </span>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`p-2 rounded-md ${
            currentPage >= totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};