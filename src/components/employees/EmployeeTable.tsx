

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

  // Access companies array from the nested response
  const organizations = response?.data?.companies || [];
  // Access pagination metadata
  const pagination = response?.data?.pagination || {
    total: 0,
    page: 1,
    pages: 1,
    limit: 20
  };
  
  const totalPages = pagination.pages || 1;
  // const totalItems = pagination.total || 0;

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    // Add safeguard in case organizations is not an array
    if (!Array.isArray(organizations)) {
      console.error("Organizations is not an array:", organizations);
      return;
    }

    const exportData = organizations.map((org, index) => ({
      "S/N": (page - 1) * take + index + 1,
      Organization: org.companyName,
      "Employee Count": org.employeeCount || 0,
      "Employee Size": org.employeeSize || "N/A",
      Industry: org.industry || "N/A",
      "Subscription Type": org.subscriptionType || "N/A",
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
          <SortButton onClick={() => requestSort("companyName")} />
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
                onClick={() => requestSort("companyName")}
              >
                Organization{" "}
                {sortConfig.key === "companyName" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("employeeCount")}
              >
                Employees{" "}
                {sortConfig.key === "employeeCount" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("employeeSize")}
              >
                Employee Size{" "}
                {sortConfig.key === "employeeSize" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("industry")}
              >
                Industry{" "}
                {sortConfig.key === "industry" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("subscriptionType")}
              >
                Subscription{" "}
                {sortConfig.key === "subscriptionType" &&
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
                  {org.companyName}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.employeeCount || 0}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.employeeSize || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.industry || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {org.subscriptionType || "N/A"}
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