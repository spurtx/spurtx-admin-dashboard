import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort } from "react-icons/md";
import ArrowRight from "../ui/ArrowRight";

const SpotTable = () => {
  const mockData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      date: "2025-12-12",
      job: "Software Engineer",
      company: "TechNova Inc.",
      status: "Accepted",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@brightpath.com",
      date: "2025-11-15",
      job: "Product Manager",
      company: "BrightPath Co.",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex.j@futuregen.com",
      date: "2025-10-30",
      job: "Data Analyst",
      company: "FutureGen Inc.",
      status: "Accepted",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@ecoware.com",
      date: "2025-09-20",
      job: "HR Specialist",
      company: "EcoWare Ltd.",
      status: "Rejected",
    },
    {
      id: 5,
      name: "Chris Brown",
      email: "chris.b@wavesphere.io",
      date: "2025-08-05",
      job: "Software Engineer",
      company: "WaveSphere",
      status: "Accepted",
    },
  ];

  return (
    <CardContainer>
      {/* Top Controls */}
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
        </div>
      </div>

      {/* Table */}
      <div>
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white text-[13px] text-start font-normal">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th className="px-5 text-start">Name</th>
              <th className="px-5 text-start">Email</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Job</th>
              <th className="px-5 text-start">Company</th>
              <th className="px-5 text-start">Status</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">{index + 1}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.name}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.email}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.date}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.job}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.company}</td>
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <span
                    className={`px-3 py-[2px] rounded-full text-xs font-medium ${
                      item.status === "Accepted"
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {item.status}
                  </span>
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

export default SpotTable;
