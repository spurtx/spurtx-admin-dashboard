import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import GradientDots from "../../ui/GradientDots";
import UserModal from "../../ui/UserModal";

interface TableRow {
  sn: string;
  name: string;
  email: string;
  emailVerification: string;
  dateJoined: string;
  userType: string;
  subscription: string;
}

// Sample Data
export const tableData: TableRow[] = [
  "Sarah Martins", "John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "Daniel Brown",
  "Sophia Wilson", "James Anderson", "Olivia Thomas", "William Jackson", "Emma White", "Benjamin Harris"
].map((name, index) => ({
  sn: (index + 1).toString().padStart(2, "0"),
  name,
  email: `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
  emailVerification: index % 2 === 0 ? "Verified" : "Unverified",
  dateJoined: `01/${(index + 1).toString().padStart(2, "0")}/25`,
  userType: index % 2 === 0 ? "Consultant" : "Client",
  subscription: index % 3 === 0 ? "Active" : "Inactive",
}));

const ProductTable: React.FC = () => {
  const [openRow, setOpenRow] = useState<string | null>(null);

  const actions = [
    { label: "Resend Email Verification Code", onClick: () => console.log("Resend Code clicked") },
    { label: "Verification Reminder", onClick: () => console.log("Verification Reminder clicked") },
    { label: "Subscribe User", onClick: () => console.log("Subscribe User clicked") },
    { label: "Disable Account", onClick: () => console.log("Disable Account clicked") },
    { label: "KYC: Manually Verify (Document & Biometric)", onClick: () => console.log("Manual Verify Docs clicked") },
    { label: "Manual Verify Email", onClick: () => console.log("Manual Verify Email clicked") },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
          <tr>
            <th className="py-3 px-2">S/N</th>
            <th className="px-5 text-start">Name</th>
            <th className="px-5 text-start">Email</th>
            <th className="px-5 text-start">Email Verification</th>
            <th className="px-5 text-start">Date Joined</th>
            <th className="px-5 text-start">User Type</th>
            <th className="px-5 text-start">Subscription</th>
            <th className="px-5"></th>
            <th className="px-5"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.sn} className="relative">
              <td className="p-2 text-gray-500 text-[13px] font-semibold">{row.sn}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.name}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.email}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.emailVerification}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.dateJoined}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.userType}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.subscription}</td>
              <td className="py-2 px-5 text-center">
                <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
              </td>
              <td className="py-2 px-5 text-center relative">
                {/* Button to Toggle Modal */}
                <button onClick={() => setOpenRow(openRow === row.sn ? null : row.sn)} className="cursor-pointer">
                  <GradientDots />
                </button>

                {/* if row is not null then open Modal */}
                {openRow === row.sn && (
                  <div className="absolute right-33 mt-2 w-48 bg-white shadow-md z-10 rounded-md">
                    <UserModal actions={actions} onClose={() => setOpenRow(null)} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
