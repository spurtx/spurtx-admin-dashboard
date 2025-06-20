import { useState, useEffect } from "react";
import CardContainer from "../../ui/CardContainer";
import { SearchInput } from "../../common/SearchInput";
import { ExportButton } from "../../common/ExportButton";
import { SortButton } from "../../common/SortButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "../../common/Pagination";
import { useProposalsData } from "../../../hooks/sync/projects/useProposalData";
import { exportToCSV } from "../../../utils/exportToCSV";
import formatDated from "../../../utils/formatDate";
import Skeleton from "../../sync/projects/ProjectCardSkeleton";
import { ProposalStatusLabels } from "../../../constants/syncstatuslabels";
import { ProposalStatus } from "../../../types/sync";

const ProposalTable = () => {
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
  } = useProposalsData({
    page,
    limit,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  const proposals = response?.data?.data || [];
  const totalPages = response?.data?.meta?.totalPages || 1;

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

  const getStatusStyles = (status: ProposalStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-500";
      case "DECLINED":
        return "bg-red-100 text-red-500";
      case "PENDING":
        return "bg-yellow-100 text-yellow-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const handleExport = () => {
    const exportData = proposals.map((proposal) => ({
      "S/N": proposal.id,
      Name: proposal.createdBy?.name || "N/A",
      Email: proposal.createdBy?.email || "N/A",
      Date: formatDated(proposal.createdAt),
      Project: proposal.project?.name || "N/A",
      "Owner of Project": proposal.project?.owner?.name || "N/A",
      Status:
        ProposalStatusLabels[
          proposal.status as keyof typeof ProposalStatusLabels
        ] || proposal.status,
      Title: proposal.title,
      Description: proposal.description?.replace(/<[^>]*>/g, "") || "",
    }));

    exportToCSV(exportData, "Proposals_List");
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

  if (isError) return <div>Error loading proposals</div>;

  return (
    <CardContainer>
      <div className="flex justify-between mb-4">
        <SearchInput
          placeholder="Search milestones, projects..."
          value={searchInput}
          onChange={setSearchInput}
        />
        <div className="flex gap-3">
          <SortButton onClick={() => requestSort("title")} />
          <ExportButton onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-primary text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("createdBy.name")}
              >
                Name{" "}
                {sortConfig.key === "createdBy.name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-5 text-start cursor-pointer"
                onClick={() => requestSort("createdBy.email")}
              >
                Email{" "}
                {sortConfig.key === "createdBy.email" &&
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
                onClick={() => requestSort("project.name")}
              >
                Project{" "}
                {sortConfig.key === "project.name" &&
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
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal, index) => (
              <tr key={proposal.id} className="border-b">
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {proposal.applicant?.firstName || "N/A"}{" "}
                  {proposal.applicant?.lastName || ""}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {proposal.applicant?.email || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {formatDate(proposal.createdAt)}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {proposal.project?.name || "N/A"}
                </td>

                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`${getStatusStyles(
                      proposal.status
                    )} text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
                  >
                    <span>
                      {ProposalStatusLabels[
                        proposal.status as keyof typeof ProposalStatusLabels
                      ] || proposal.status}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-5 text-center">
                  <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
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

export default ProposalTable;
