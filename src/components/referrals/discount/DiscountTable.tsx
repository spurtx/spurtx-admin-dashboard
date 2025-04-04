import { RiDeleteBin6Line } from "react-icons/ri";
import ArrowRight from "../../ui/ArrowRight";

// Utility function to generate a random alphanumeric code
const generateRandomCode = () => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    "REF" +
    Array.from({ length: 5 }, () =>
      randomChars[Math.floor(Math.random() * randomChars.length)]
    ).join("")
  );
};

// Sample data generation
interface TableRow {
  sn: string;
  label: string;
  code: string;
  stripeCoupon: string;
  signUps: number;
  pageVisits: number;
  subscription: string;
}

export const tableData: TableRow[] = [
  "Spurt! Newsletter",
  "Sarah Martins",
  "Dekan",
  "Solo Praise",
  "Hannover Logistics",
  "Maxin Logics",
  "Dekan Solutions",
  "Eagle Services",
  "SmartTech Hub",
  "Quantum Systems",
].map((label, index) => ({
  sn: (index + 1).toString().padStart(2, "0"),
  label,
  code: generateRandomCode(),
  stripeCoupon: `COUPONX${index + 1}`,
  signUps: Math.floor(Math.random() * 100), // Random 1-99
  pageVisits: Math.floor(Math.random() * 10000), // Random 1-9999
  subscription: index % 2 === 0 ? "Active" : "Inactive",
}));

const DiscountTable = () => {
  return (
    <div className="overflow-x-auto my-4 bg-white shadow-md">
      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
          <tr>
            <th className="py-3 px-2">S/N</th>
            <th className="px-5 text-start">Label</th>
            <th className="px-5 text-start">Code</th>
            <th className="px-5 text-start">Stripe Coupon</th>
            <th className="px-5 text-start">Sign Ups</th>
            <th className="px-5 text-start">Page Visits</th>
            <th className="px-5 text-start">Subscription</th>
            <th className="px-5"></th>
            <th className="px-5"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.sn}>
              <td className="p-2 text-gray-500 text-[13px] font-semibold">{row.sn}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.label}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.code}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.stripeCoupon}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.signUps}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.pageVisits}</td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{row.subscription}</td>
              <td className="py-2 px-5 text-center">
                <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
              </td>
              <td className="py-2 px-5 text-center">
                <ArrowRight />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountTable;
