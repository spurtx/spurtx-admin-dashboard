import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import ArrowRight from "../ui/ArrowRight";

const mockOrganizations = [
  {
    id: 1,
    name: "Isodokan",
    departments: 5,
    emoCount: 42,
    additions: 750,
    rejections: 120,
  },
  {
    id: 2,
    name: "Chocboy",
    departments: 7,
    emoCount: 58,
    additions: 900,
    rejections: 87,
  },
  {
    id: 3,
    name: "iHatch",
    departments: 6,
    emoCount: 39,
    additions: 430,
    rejections: 65,
  },
  {
    id: 4,
    name: "Atlas",
    departments: 8,
    emoCount: 61,
    additions: 1000,
    rejections: 240,
  },
  {
    id: 5,
    name: "Konji",
    departments: 3,
    emoCount: 27,
    additions: 315,
    rejections: 43,
  },
  {
    id: 6,
    name: "Dekan",
    departments: 9,
    emoCount: 70,
    additions: 820,
    rejections: 190,
  },
  {
    id: 7,
    name: "Hanover",
    departments: 4,
    emoCount: 31,
    additions: 410,
    rejections: 58,
  },
  {
    id: 8,
    name: "iHatch",
    departments: 6,
    emoCount: 55,
    additions: 765,
    rejections: 105,
  },
  {
    id: 9,
    name: "Atlas",
    departments: 10,
    emoCount: 88,
    additions: 990,
    rejections: 320,
  },
  {
    id: 10,
    name: "Konji",
    departments: 4,
    emoCount: 44,
    additions: 600,
    rejections: 77,
  },
];

const EmployeeTable = () => {
  // Replace with fetched data when ready
  const organizations = mockOrganizations;

  return (
    <CardContainer>
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="search organization"
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
              <th className="px-5 text-left">Organization</th>
              <th className="px-5 text-left">No. of Depts</th>
              <th className="px-5 text-left">No. of Emo</th>
              <th className="px-5 text-left">Additions</th>
              <th className="px-5 text-left">Rejections</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, index) => (
              <tr key={org.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{org.name}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{org.departments}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{org.emoCount}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{org.additions}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{org.rejections}</td>
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

export default EmployeeTable;
