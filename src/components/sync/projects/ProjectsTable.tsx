

import CardContainer from '../../ui/CardContainer'
import { IoSearchOutline } from "react-icons/io5";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsChatLeftDots } from "react-icons/bs"; // Assuming BsChatLeftDots for the chat icon
import bank from "../../../assets/images/sync/bank-logo.svg";
;
import Avatars from '../../heroUI/Avatars';

const ProjectsTable = () => {
  const projects = [
    {
      id: 1,
      projectName: "Hanover Website",
      projectOwner: "John Doe",
      date: "2025-04-28",
      status: "Completed",
      phone: "+233 123 4567",
    },
    {
      id: 2,
      projectName: "Signal Website",
      projectOwner: "Sarah Kim",
      date: "2025-05-02",
      status: "Pending",
      phone: "+233 234 5678",
    },
    {
      id: 3,
      projectName: "Marketing Landing Page",
      projectOwner: "Emily Stone",
      date: "2025-05-10",
      status: "Completed",
      phone: "+233 345 6789",
    },
    {
      id: 4,
      projectName: "Mobile App UI",
      projectOwner: "Michael Chan",
      date: "2025-06-01",
      status: "Pending",
      phone: "+233 456 7890",
    },
  ];

  return (
    <CardContainer className="">
      {/* Search & Buttons */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="Search"
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-primary text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 px-3 text-start">Project</th>
              <th className="px-5 text-start">Project Owner</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Members</th>
              <th className="px-5 text-start">Status</th>
              <th className="px-5 text-start">Chat</th>
              <th className="px-5 text-start"></th> {/* For Delete icon */}
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr key={item.id}>
                {/* Project */}
                <td className="py-2 px-3 text-gray-600 text-[13px] font-semibold">
                  <div className="flex items-center gap-2">
                    <img src={bank} alt="bank logo" className="w-6 h-6" />
                    <span>{item.projectName}</span>
                  </div>
                </td>

                {/* Project Owner */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  {item.projectOwner}
                </td>

                {/* Date */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  {item.date}
                </td>

                {/* Members */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  <Avatars />
                </td>

                {/* Status */}
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`flex justify-center px-3 py-1.5 rounded-[17px] text-sm ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status}
                  </div>
                </td>

                {/* Chat */}
                <td className="py-2 px-5 text-gray-600 text-[13px] font-semibold">
                  <div className="flex items-center gap-1">
                    <BsChatLeftDots className="text-primary" />
                    <span>{item.phone}</span>
                  </div>
                </td>

                {/* Delete */}
                <td className="py-2 px-5 text-center">
                  <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContainer>
  )
}

export default ProjectsTable

