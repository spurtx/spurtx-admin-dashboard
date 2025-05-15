import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import ArrowRight from "../ui/ArrowRight";

const mockTransactions = [
  {
    id: 1,
    partyName: "Sarah Martins",
    accountNumber: "1234567890",
    amount: "$45",
    date: "2025-05-10",
    transactionId: "87456213",
    provider: "Delores",
    fee: "$10",
    status: "Successful",
  },
  {
    id: 2,
    partyName: "Cloud AI",
    accountNumber: "5432198765",
    amount: "$32",
    date: "2025-05-11",
    transactionId: "90237456",
    provider: "Trula",
    fee: "$08",
    status: "Successful",
  },
  {
    id: 3,
    partyName: "Power CO",
    accountNumber: "9876543210",
    amount: "$50",
    date: "2025-05-12",
    transactionId: "13489276",
    provider: "Aisha",
    fee: "$12",
    status: "Successful",
  },
  {
    id: 4,
    partyName: "Amazon",
    accountNumber: "1029384756",
    amount: "$28",
    date: "2025-05-13",
    transactionId: "34890217",
    provider: "Vinnie",
    fee: "$07",
    status: "Successful",
  },
  {
    id: 5,
    partyName: "Hannover Logistics",
    accountNumber: "8765432109",
    amount: "$39",
    date: "2025-05-14",
    transactionId: "56473829",
    provider: "Delores",
    fee: "$06",
    status: "Successful",
  },
  {
    id: 6,
    partyName: "BlueSky Tech",
    accountNumber: "6574839201",
    amount: "$22",
    date: "2025-05-15",
    transactionId: "19283746",
    provider: "Trula",
    fee: "$09",
    status: "Successful",
  },
  {
    id: 7,
    partyName: "NeoPower Inc.",
    accountNumber: "7362910458",
    amount: "$46",
    date: "2025-05-16",
    transactionId: "92837465",
    provider: "Aisha",
    fee: "$11",
    status: "Successful",
  },
  {
    id: 8,
    partyName: "GreenStream",
    accountNumber: "3749201836",
    amount: "$35",
    date: "2025-05-17",
    transactionId: "37482019",
    provider: "Vinnie",
    fee: "$05",
    status: "Successful",
  },
  {
    id: 9,
    partyName: "Zenith Services",
    accountNumber: "4901837265",
    amount: "$40",
    date: "2025-05-18",
    transactionId: "84019283",
    provider: "Delores",
    fee: "$07",
    status: "Successful",
  },
  {
    id: 10,
    partyName: "DigitalCore",
    accountNumber: "1827364590",
    amount: "$27",
    date: "2025-05-19",
    transactionId: "10928374",
    provider: "Trula",
    fee: "$06",
    status: "Successful",
  },
];

const WalletTable = () => {
  // This would be your actual fetched data in the future
  const transactions = mockTransactions;

  return (
    <CardContainer>
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="search"
            className="text-gray-600 outline-none bg-transparent w-full"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]">
            <MdSort />
            Sort Table
          </button>
          <button className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]">
            <MdOutlineCloudUpload />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div>
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] font-normal">
            <tr>
              <th className="py-3 px-3 text-left">S/N</th>
              <th className="px-5 text-left">Party Name</th>
              <th className="px-5 text-left">Acc. Numb.</th>
              <th className="px-5 text-left">Amount</th>
              <th className="px-5 text-left">Date of Transaction</th>
              <th className="px-5 text-left">Transactn. ID</th>
              <th className="px-5 text-left">Provider</th>
              <th className="px-5 text-left">Transaction Fee</th>
              <th className="px-5 text-left">Status</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.partyName}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.accountNumber}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.amount}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.date}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.transactionId}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.provider}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{tx.fee}</td>
                <td className="py-2 px-5 text-green-600 text-[13px] font-semibold">{tx.status}</td>
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
    </CardContainer>
  );
};

export default WalletTable;
