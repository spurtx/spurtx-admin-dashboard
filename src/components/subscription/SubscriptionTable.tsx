
import { useState, useEffect } from "react";
import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import GradientDots from "../ui/GradientDots";
import { useSubscriptionData } from "../../hooks/sync/projects/useSubscriptionData";
import { exportToCSV } from "../../utils/exportToCSV";
import { Pagination } from "../common/Pagination";

const SubscriptionTable = () => {
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
  } = useSubscriptionData({
    page,
    limit,
    search: debouncedSearch,
    sortBy: `${sortConfig.key}:${sortConfig.direction.toUpperCase()}`,
  });

  const subscriptions = response?.data?.data || [];
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

  const handleExport = () => {
  const exportData = subscriptions.map((subscription) => ({
    "S/N": subscription.id,
    Name: `${subscription.user?.firstName || ""} ${subscription.user?.lastName || ""}`.trim() || "N/A",
    Email: subscription.user?.email || "N/A",
    "Date of Subscription": formatDate(subscription.createdAt),
    "Subscription Type": subscription.plan || "N/A",
    "Amount Paid": subscription.amountPaid ? `$${subscription.amountPaid}` : "N/A",
    Duration: subscription.duration || "N/A",
    "Expiration Date": formatDate(subscription.expiryDate),
  }));

  exportToCSV(exportData, "Subscriptions_List");
};

  if (isLoading) {
    return (
      <CardContainer>
        <div>Loading subscriptions...</div>
      </CardContainer>
    );
  }

  if (isError) return <div>Error loading subscriptions</div>;

  return (
    <CardContainer>
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="Search subscriptions..."
            className="text-gray-600 outline-none bg-transparent w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button 
            className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]"
            onClick={() => requestSort("createdAt")}
          >
            <MdSort />
            Sort Table
            {sortConfig.key === "createdAt" && (
              sortConfig.direction === "asc" ? " ↑" : " ↓"
            )}
          </button>
          <button 
            className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]"
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
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] font-normal">
            <tr>
              <th className="py-3 px-3 text-left">S/N</th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("user.name")}
              >
                Name
                {sortConfig.key === "user.name" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("user.email")}
              >
                Email
                {sortConfig.key === "user.email" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                Date of Subscription
                {sortConfig.key === "createdAt" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("duration")}
              >
                Length
                {sortConfig.key === "duration" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("expiresAt")}
              >
                Expiration Date
                {sortConfig.key === "expiresAt" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th 
  className="px-5 text-left cursor-pointer"
  onClick={() => requestSort("amountPaid")}
>
  Amount Paid
  {sortConfig.key === "amountPaid" &&
    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
</th>
              <th 
                className="px-5 text-left cursor-pointer"
                onClick={() => requestSort("type")}
              >
                Subscription Type
                {sortConfig.key === "type" &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={subscription.id} className="border-b">
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {subscription.user?.firstName || "N/A"} {subscription?.user.lastName}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {subscription.user?.email || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {formatDate(subscription?.createdAt)}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {subscription?.duration || "N/A"}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {formatDate(subscription.expiryDate)}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
  {subscription.amountPaid ?? "N/A"}
</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {subscription?.plan || "N/A"}
                </td>
                <td className="py-2 px-5 text-center">
                  <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
                </td>
                <td className="py-2 px-5 text-center">
                  <GradientDots />
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

export default SubscriptionTable;
