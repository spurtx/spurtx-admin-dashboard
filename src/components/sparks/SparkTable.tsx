import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import ArrowRight from "../ui/ArrowRight";

const SparkTable = () => {
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
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th className="px-5 text-start">Spark Title</th>
              <th className="px-5 text-start">Company</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Spark Type</th>
              <th className="px-5 text-start">Department of Recipient</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                title: "Varga Boglarka",
                company: "FutureGen Inc.",
                date: "2025-12-12",
                type: "Day trip",
                department: "Marketing",
              },
              {
                id: 2,
                title: "Kende Lili",
                company: "BrightPath Co.",
                date: "2025-12-12",
                type: "Off the course",
                department: "Sales",
              },
              {
                id: 3,
                title: "Nagy Zsolt",
                company: "TechNova",
                date: "2025-12-12",
                type: "Tailored to you",
                department: "Engineering",
              },
              {
                id: 4,
                title: "Luka Simon",
                company: "EcoWare Ltd.",
                date: "2025-12-12",
                type: "Day trip",
                department: "HR",
              },
              {
                id: 5,
                title: "Kovács Emma",
                company: "WaveSphere",
                date: "2025-12-12",
                type: "Off the course",
                department: "Operations",
              },
              {
                id: 6,
                title: "Tóth Ádám",
                company: "NimbleTech",
                date: "2025-12-12",
                type: "Tailored to you",
                department: "Finance",
              },
              {
                id: 7,
                title: "Mészáros Anna",
                company: "QuantumLeap",
                date: "2025-12-12",
                type: "Day trip",
                department: "Customer Support",
              },
            ].map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.title}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.company}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.date}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.type}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.department}
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
    </CardContainer>
  );
};

export default SparkTable;
