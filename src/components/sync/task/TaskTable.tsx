import CardContainer from "../../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import ArrowRight from "../../ui/ArrowRight";

const TaskTable = () => {
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
              <th className="py-3 text-start px-3">S/N</th>
              <th className="px-5 text-start">Task Name</th>
              <th className="px-5 text-start">Account Type</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Status</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                task: "Design Landing Page",
                accountType: "Creator",
                date: "2025-12-12",
                status: "Completed",
              },
              {
                id: 2,
                task: "Onboard Team",
                accountType: "Business",
                date: "2025-12-12",
                status: "Not Started",
              },
              {
                id: 3,
                task: "Deploy Backend",
                accountType: "Admin",
                date: "2025-12-12",
                status: "Completed",
              },
              {
                id: 4,
                task: "Schedule Campaign",
                accountType: "Business",
                date: "2025-12-12",
                status: "Not Started",
              },
              {
                id: 5,
                task: "Finalize Budget",
                accountType: "User",
                date: "2025-12-12",
                status: "Completed",
              },
              {
                id: 6,
                task: "Conduct Survey",
                accountType: "Creator",
                date: "2025-12-12",
                status: "Not Started",
              },
              {
                id: 7,
                task: "Upload Assets",
                accountType: "Admin",
                date: "2025-12-12",
                status: "Completed",
              },
            ].map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.task}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.accountType}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.date}
                </td>
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`${
                      item.status === "Completed"
                        ? "bg-green-100 text-primary"
                        : "bg-gray-200 text-gray-600"
                    } text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
                  >
                    <span>{item.status}</span>
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
    </CardContainer>
  );
};

export default TaskTable;
