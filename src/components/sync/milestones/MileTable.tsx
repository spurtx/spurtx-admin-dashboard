

import { useState, useEffect } from "react";
import CardContainer from "../../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useMilestonesData } from "../../../hooks/sync/projects/useMilestoneData";
import { exportToCSV } from "../../../utils/exportToCSV";
import formatDated from "../../../utils/formatDate";
import Skeleton from "../../sync/projects/ProjectCardSkeleton";
import { MilestoneStatusLabels } from "../../../constants/syncstatuslabels";
import { MilestoneStatus } from "../../../types/sync";

// Define milestone status labels similar to ProjectStatusLabels
// const MilestoneStatusLabels = {
//   'NOT ASSIGNED': 'Not Assigned',
//   'IN_PROGRESS': 'In Progress',
//   'COMPLETED': 'Completed',
//   'OVERDUE': 'Overdue'
// };

const MileTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: response, isLoading, isError } = useMilestonesData({
    page,
    limit,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  const milestones = response?.data?.data || [];
  const totalPages = response?.data?.meta?.totalPages || 1;

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

 const getStatusStyles = (status: MilestoneStatus) => {
     switch (status) {
       case "COMPLETED":
         return "bg-green-100 text-green-500";
       case "UNDER REVIEW":
         return "bg-yellow-100 text-yellow-600";
       case "NOT ASSIGNED":
        return "bg-gray-100 text-gray-600";
       case "REJECTED":
        return "bg-red-100 text-red-500" ;
       case "NOT STARTED":
        return "bg-blue-100 text-blue-500";
       case "IN PROGRESS":
        return "bg-yellow-200 text-yellow-700"  
       default:
         return "bg-gray-100 text-gray-500";
     }
   };

  const handleExport = () => {
    const exportData = milestones.map((milestone) => ({
      'Milestone Title': milestone.title,
      'Project': milestone.project?.name || 'N/A',
      'Due Date': formatDated(milestone.dueAt),
      'Created At': formatDated(milestone.createdAt),
      'Status': MilestoneStatusLabels[milestone.status as keyof typeof MilestoneStatusLabels] || milestone.status,
      'Description': milestone.description?.replace(/<[^>]*>/g, '') || '',
    }));

    exportToCSV(exportData, "Milestones_List");
  };

  if (isLoading) {
    return (
      <CardContainer>
        <div className="space-y-4">
          <Skeleton />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </CardContainer>
    );
  }

  if (isError) return <div>Error loading milestones</div>;

  return (
    <CardContainer>
      {/* Search & Buttons */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="Search milestones, projects..."
            className="text-gray-600 outline-none bg-transparent w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button 
            className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]"
            onClick={() => requestSort('title')}
          >
            <MdSort />
            Sort Table
          </button>
          <button 
            className="flex gap-2 border cursor-pointer items-center px-3 border-gray-300 text-gray-400 rounded-[3px]" 
            onClick={handleExport}
          >
            <MdOutlineCloudUpload />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-primary text-white text-[13px] text-start font-normal">
            <tr>
              <th 
                className="py-3 px-3 text-start cursor-pointer"
                onClick={() => requestSort('title')}
              >
                Milestone {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort('project.name')}
              >
                Project {sortConfig.key === 'project.name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort('dueAt')}
              >
                Due Date {sortConfig.key === 'dueAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                CreatedAt {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              
              <th className="px-5 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <tr key={milestone.id} className="border-b">
                {/* Milestone Title */}
                <td className="py-2 px-3 text-gray-600 text-[13px] font-semibold">
                  {milestone.title}
                </td>

                {/* Project */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  {milestone.project?.name || 'N/A'}
                </td>

                {/* Due Date */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  {formatDate(milestone.dueAt)}
                </td>

                {/* Created At */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  {formatDate(milestone.createdAt)}
                </td>

                {/* Status */}
                <td className="py-2 px-5 text-[7px] font-semibold">
                  <div
                    className={`flex justify-center uppercase px-3 py-1.5 text-[10px] flex-row rounded-[23px] text-sm whitespace-nowrap ${getStatusStyles(
                      milestone.status
                    )}`}
                  >
                    {MilestoneStatusLabels[milestone.status as keyof typeof MilestoneStatusLabels] || milestone.status}
                  </div>
                </td>

               

                {/* Delete */}
                <td className="py-2 px-5 text-center">
                  <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing page {page} of {totalPages}
        </div>
        <div className="flex gap-5 rounded-[13px] border border-gray-300 shadow-md px-1 py-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="cursor-pointer"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="cursor-pointer"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </CardContainer>
  );
};

export default MileTable;

