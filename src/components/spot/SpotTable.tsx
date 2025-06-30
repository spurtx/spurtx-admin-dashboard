
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../ui/CardContainer";
import { SearchInput } from "../common/SearchInput";
import { ExportButton } from "../common/ExportButton";
import { SortButton } from "../common/SortButton";
import { Pagination } from "../common/Pagination";
import { useJobSeekersData } from "../../hooks/toolkit/useJobSeekersData";
import { exportToCSV } from "../../utils/exportToCSV";
import formatDated from "../../utils/formatDate";
import Skeleton from "../sync/projects/ProjectCardSkeleton";

import GradientDots from "../ui/GradientDots";

const SpotTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(30); // 30 items per page
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "createdAt", direction: "desc" });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { 
    data: response, 
    isLoading, 
    isError 
  } = useJobSeekersData({
    page,
    limit,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  // Correct data extraction
  const jobSeekers = response?.data?.jobSeekers || [];
  const totalPages = response?.data?.pageMetaDto?.pageCount || 1;

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  const handleExport = () => {
    const exportData = jobSeekers.map((seeker, index) => ({
      "S/N": index + 1,
      Name: seeker.name,
      Email: seeker.email,
      "Joined Date": formatDated(seeker.createdAt),
      "Phone Number": seeker.phoneNumber,
      Location: seeker.location,
      Gender: seeker.gender || "N/A",
    }));

    exportToCSV(exportData, "Job_Seekers_List");
  };

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const viewApplications = (userId: string) => {
    navigate(`/dashboard/spot/job-seekers/${userId}/applications`);
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

  if (isError) return (
    <CardContainer>
      <div className="flex justify-center py-10 text-red-500">
        Error loading job seekers data
      </div>
    </CardContainer>
  );

  return (
    <CardContainer>
      <div className="flex justify-between mb-4">
        <SearchInput
          placeholder="Search job seekers, locations, phone..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <div className="flex gap-3">
          <SortButton onClick={() => requestSort("name")} />
          <ExportButton onClick={handleExport} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("email")}
              >
                Email{" "}
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                Joined Date{" "}
                {sortConfig.key === "createdAt" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("phoneNumber")}
              >
                Phone{" "}
                {sortConfig.key === "phoneNumber" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("location")}
              >
                Location{" "}
                {sortConfig.key === "location" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobSeekers.map((seeker, index) => (
              <tr key={seeker.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {seeker.name}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {seeker.email}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {formatDate(seeker.createdAt)}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {seeker.phoneNumber}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {seeker.location || "N/A"}
                </td>
                <td className="py-2 px-5 relative">
                  <button 
                    onClick={() => toggleMenu(seeker.id)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <GradientDots />
                  </button>
                  
                  {activeMenu === seeker.id && (
                    <div className="absolute right-5 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => viewApplications(seeker.userId)}
                      >
                        View Job Applications
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </CardContainer>
  );
};

export default SpotTable;