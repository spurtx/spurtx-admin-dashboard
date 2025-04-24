import ArrowRight from "../ui/ArrowRight";
import { RiDeleteBin6Line } from "react-icons/ri";

const dummyData = [
    {
      id: 1,
      title: "Q1 Performance Review",
      date: "2025-12-12",
      company: "Synergy Corp",
      responses: 3,
      status: "Published",
    },
    {
      id: 2,
      title: "Team Growth Feedback",
      date: "2025-12-12",
      company: "NexTech Solutions",
      responses: 0,
      status: "Not Published",
    },
    {
      id: 3,
      title: "Mid-Year Appraisal",
      date: "2025-12-12",
      company: "Orbital Systems",
      responses: 7,
      status: "Published",
    },
    {
      id: 4,
      title: "Innovation Insights",
      date: "2025-12-12",
      company: "FutureWorks",
      responses: 5,
      status: "Published",
    },
    {
      id: 5,
      title: "Annual Performance Check",
      date: "2025-12-12",
      company: "Vanta Technologies",
      responses: 1,
      status: "Not Published",
    },
    {
      id: 6,
      title: "Team Wellness Survey",
      date: "2025-12-12",
      company: "NovaGroup",
      responses: 4,
      status: "Published",
    },
  ];

const AppraisalTable = () => {
  return (
    <div>
        <table className="w-full border-collapse">
          <thead className="text-white text-[13px] text-start font-normal bg-gradient-to-r from-[#00A15D] to-[#C16407]">
            <tr>
              <th className="py-3 text-start px-3">S/N</th>
              <th className="px-5 text-start">Appraisal Title</th>
              <th className="px-5 text-start">Date</th>
              <th className="px-5 text-start">Company</th>
              <th className="px-5 text-start">Number of Responses</th>
              <th className="px-5 text-start">Status</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {index + 1}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.title}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.date}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.company}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                  {item.responses}
                </td>
                <td className="py-2 px-5 text-[13px] font-semibold">
                  <div
                    className={`${
                      item.status === "Published"
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
  )
}

export default AppraisalTable