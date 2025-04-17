import CardContainer from "../../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const dummyData = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  project: `Milestone ${i + 1}`,
  date: "12/06/24",
  owner: "Liza Francis",
  status: "Completed",
}));

const MileTable = () => {
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
          <thead className="bg-primary text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">Project</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Project Owner</th>
              <th className="px-10 text-start">Status</th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">{item.project}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.date}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.owner}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  <div className="text-primary text-sm bg-green-100 w-30 flex justify-center rounded-[15px] px-3 py-1">
                    <span>{item.status}</span>
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
    </CardContainer>
  );
};

export default MileTable;

