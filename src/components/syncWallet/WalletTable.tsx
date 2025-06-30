

import { isAxiosError } from "axios";
import { useState } from "react";
import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useWalletData } from "../../hooks/sync/projects/useWalletData";
import { exportToCSV } from "../../utils/exportToCSV";

const WalletTable = () => {
  const [searchInput, setSearchInput] = useState("");
 
  
  const {
    data: transfers = [],
    isLoading,
    isError,
    error,
  } = useWalletData();

  // Client-side search filtering
  const filteredTransfers = transfers.filter(transfer => {
    if (!searchInput) return true;
    const searchLower = searchInput.toLowerCase();
    
    return (
      (transfer.full_name?.toLowerCase()?.includes(searchLower)) ||
      (transfer.reference?.toLowerCase()?.includes(searchLower)) ||
      (transfer.bank_name?.toLowerCase()?.includes(searchLower)) ||
      (transfer.amount.toString().includes(searchInput)) ||
      (transfer.status?.toLowerCase()?.includes(searchLower))
    );
  });

  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  const getStatusColor = (status: string) => {
    status = status.toLowerCase();
    if (status.includes("success")) return "bg-green-100 text-green-800";
    if (status.includes("fail") || status.includes("error")) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const handleExport = () => {
    const exportData = filteredTransfers.map((transfer) => ({
      "ID": transfer.id,
      "Account Number": transfer.account_number,
      "Bank": transfer.bank_name,
      "Name": transfer.full_name,
      "Date": formatDate(transfer.created_at),
      "Amount": transfer.amount,
      "Fee": transfer.fee,
      "Currency": transfer.currency,
      "Status": transfer.status,
      "Reference": transfer.reference,
      "Narration": transfer.narration,
    }));

    exportToCSV(exportData, "Wallet_Transfers");
  };

  if (isLoading) {
    return (
      <CardContainer>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4">Loading transfers...</span>
        </div>
      </CardContainer>
    );
  }

  if (isError) {
    return (
      <CardContainer>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <h3 className="font-bold text-lg">Error Loading Data</h3>
          <p className="mt-2">Message: {error.message}</p>
          
          {/* {error.response?.data && (
            <div className="mt-3 bg-red-100 p-3 rounded">
              <p className="font-medium">Server Response:</p>
              <pre className="text-xs mt-1 overflow-auto max-h-40">
                {JSON.stringify(error.response.data, null, 2)}
              </pre>
            </div>
          )} */}

           {isAxiosError(error) && error.response?.data && (
          <div className="mt-3 bg-red-100 p-3 rounded">
            <p className="font-medium">Server Response:</p>
            <pre className="text-xs mt-1 overflow-auto max-h-40">
              {JSON.stringify(error.response.data, null, 2)}
            </pre>
          </div>
        )}
          
          <div className="mt-4 flex justify-between">
            <button 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            <a 
              href="mailto:support@teamsync.ink" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Contact Support
            </a>
          </div>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-lg w-80 py-1 px-4">
          <IoSearchOutline className="text-gray-400" />
          <input
            placeholder="Search transfers..."
            className="text-gray-600 outline-none bg-transparent w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button 
          className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleExport}
        >
          <MdOutlineCloudUpload />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800 text-white text-sm">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="px-4 text-left">Account</th>
              <th className="px-4 text-left">Bank</th>
              <th className="px-4 text-left">Name</th>
              <th className="px-4 text-left">Date</th>
              <th className="px-4 text-left">Amount</th>
              <th className="px-4 text-left">Fee</th>
              <th className="px-4 text-left">Status</th>
              <th className="px-4 text-left">Reference</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.length > 0 ? (
              filteredTransfers.map((transfer) => (
                <tr key={transfer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600 text-sm font-mono">
                    {transfer.id}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {transfer.account_number}
                  </td>
                  <td className="py-3 px-4">
                    {transfer.bank_name}
                  </td>
                  <td className="py-3 px-4">
                    {transfer.full_name}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {formatDate(transfer.created_at)}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {transfer.currency} {transfer.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {transfer.fee.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">
                    {transfer.reference}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  {searchInput ? "No matching transfers" : "No transfers found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CardContainer>
  );
};

export default WalletTable;