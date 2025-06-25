import { useState, useEffect } from "react";
import CardContainer from "../ui/CardContainer";
import { SearchInput } from "../common/SearchInput";
import { ExportButton } from "../common/ExportButton";
import { SortButton } from "../common/SortButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "../common/Pagination";
import { useEmployeeData } from "../../hooks/toolkit/useEmployeeData";
import { exportToCSV } from "../../utils/exportToCSV";
import formatDated from "../../utils/formatDate";
import Skeleton from "../sync/projects/ProjectCardSkeleton";
import ArrowRight from "../ui/ArrowRight";

const EmployeeTable = () => {
  const [page, setPage] = useState(1);
  const [take] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "createdAt", direction: "desc" });

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
    isError,
  } = useEmployeeData({
    page,
    take,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  const organizations = response?.data?.data || [];
  const totalPages = response?.meta?.totalPages || 1;
  // const totalItems = response?.meta?.totalItems || 0;

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    const exportData = organizations.map((org, index) => ({
      "S/N": index + 1,
      Organization: org.name,
      "No. of Depts": org.department || "N/A",
      "No. of Emo": org.emoCount || 0,
      Additions: org.additions || 0,
      Rejections: org.rejections || 0,
      Status: org.status,
      "Created At": formatDated(org.createdAt),
    }));

    exportToCSV(exportData, "Organizations_List");
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

  if (isError) return <div>Error loading organizations</div>;

  return (
    <CardContainer>
      <div className="flex justify-between mb-4">
        <SearchInput
          placeholder="Search organizations..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <div className="flex gap-3">
          <SortButton onClick={() => requestSort("name")} />
          <ExportButton onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Organization{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("departments")}
              >
                No. of Depts{" "}
                {sortConfig.key === "departments" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("emoCount")}
              >
                No. of Emo{" "}
                {sortConfig.key === "emoCount" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("additions")}
              >
                Additions{" "}
                {sortConfig.key === "additions" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("rejections")}
              >
                Rejections{" "}
                {sortConfig.key === "rejections" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, index) => (
              <tr key={org.id} className="border-b">
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {(page - 1) * take + index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.name}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.departments || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.emoCount}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.additions}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.rejections}
                </td>
                <td className="py-2 px-5 text-center">
                  <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
                </td>
                <td>
                  <ArrowRight />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        // totalItems={totalItems}
        // itemsPerPage={take}
        onPageChange={setPage}
      />
    </CardContainer>
  );
};

export default EmployeeTable;