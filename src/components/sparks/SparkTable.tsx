


import { useState, useEffect } from "react";
import CardContainer from "../ui/CardContainer";
import { SearchInput } from "../common/SearchInput";
import { ExportButton } from "../common/ExportButton";
import { SortButton } from "../common/SortButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "../common/Pagination";
import { useSparkData } from "../../hooks/toolkit/useSparkData";
import { exportToCSV } from "../../utils/exportToCSV";
import formatDated from "../../utils/formatDate";
import Skeleton from "../sync/projects/ProjectCardSkeleton";
// import { SparkStatusLabels } from "../../constants/toolkitStatusLabels";
// import { SparkStatus } from "../../types/toolkit";
import ArrowRight from "../ui/ArrowRight";

const SparkTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
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
  } = useSparkData({
    page,
    limit,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  const sparks = response?.data || [];
  const totalPages = response?.meta?.totalPages || 1;

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

  const getStatusStyles = (status: any) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-500";
      case "inactive":
        return "bg-red-100 text-red-500";
      case "pending":
        return "bg-yellow-100 text-yellow-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const handleExport = () => {
    const exportData = sparks.map((spark, index) => ({
      "S/N": index + 1,
      "Spark Title": spark.name,
      Company: spark.owner.name,
      Date: formatDated(spark.createdAt),
      "Spark Type": spark.type || "N/A",
      "Department of Recipient": spark.department || "N/A",
      // Status: SparkStatusLabels[spark.status] || spark.status,
    }));

    exportToCSV(exportData, "Sparks_List");
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

  if (isError) return <div>Error loading sparks</div>;

  return (
    <CardContainer>
      <div className="flex justify-between mb-4">
        <SearchInput
          placeholder="Search sparks, companies..."
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
                Spark Title{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("owner.name")}
              >
                Company{" "}
                {sortConfig.key === "owner.name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                Date{" "}
                {sortConfig.key === "createdAt" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("type")}
              >
                Spark Type{" "}
                {sortConfig.key === "type" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("department")}
              >
                Department{" "}
                {sortConfig.key === "department" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-10 text-start cursor-pointer"
                onClick={() => requestSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {sparks.map((spark, index) => (
              <tr key={spark.id} className="border-b">
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {spark.name}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {spark.owner?.name || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {formatDate(spark.createdAt)}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {spark.type || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {spark.department || "N/A"}
                </td>
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`${getStatusStyles(
                      spark.status
                    )} text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
                  >
                    <span>
                      {spark.status }
                    </span>
                  </div>
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
        onPageChange={setPage}
      />
    </CardContainer>
  );
};

export default SparkTable;