import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import CardContainer from "../../ui/CardContainer";
import { RiDeleteBin6Line } from "react-icons/ri";
import ArrowRight from "../../ui/ArrowRight";

const ProposalTable = () => {
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
              <th className="px-5 text-start">Name</th>
              <th className="px-5 text-start">Email</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Project</th>
              <th className="px-5 text-start">Owner of Project</th>
              <th className="px-10 text-start">Status</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
                date: "2025-12-12",
                project: "Marketing Campaign",
                owner: "Liza Francis",
                status: "accepted",
              },
              {
                id: 2,
                name: "Sarah Kim",
                email: "sarah.kim@example.com",
                date: "2025-12-12",
                project: "UI Redesign",
                owner: "Liza Francis",
                status: "rejected",
              },
              {
                id: 3,
                name: "Michael Chan",
                email: "michael.chan@example.com",
                date: "2025-12-12",
                project: "Website Migration",
                owner: "Liza Francis",
                status: "accepted",
              },
              {
                id: 4,
                name: "Emily Stone",
                email: "emily.stone@example.com",
                date: "2025-12-12",
                project: "App Prototype",
                owner: "Liza Francis",
                status: "rejected",
              },
              {
                id: 5,
                name: "David Park",
                email: "david.park@example.com",
                date: "2025-12-12",
                project: "Customer Survey",
                owner: "Liza Francis",
                status: "accepted",
              },
              {
                id: 6,
                name: "Chloe Reed",
                email: "chloe.reed@example.com",
                date: "2025-12-12",
                project: "SEO Optimization",
                owner: "Liza Francis",
                status: "accepted",
              },
              {
                id: 7,
                name: "Jake Torres",
                email: "jake.torres@example.com",
                date: "2025-12-12",
                project: "Brand Guidelines",
                owner: "Liza Francis",
                status: "rejected",
              },
              {
                id: 8,
                name: "Nina Brooks",
                email: "nina.brooks@example.com",
                date: "2025-12-12",
                project: "Ad Strategy",
                owner: "Liza Francis",
                status: "accepted",
              },
            ].map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.name}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.email}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.date}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.project}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.owner}
                </td>
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`${
                      item.status === "accepted"
                        ? "bg-green-100 text-primary"
                        : "bg-red-100 text-red-500"
                    } text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
                  >
                    <span>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
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

export default ProposalTable;
