import CardContainer from "../ui/CardContainer";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSort, MdOutlineCloudUpload } from "react-icons/md";
import ArrowRight from "../ui/ArrowRight";

const mockSubscriptions = [
  {
    id: 1,
    name: "Coding Bootcamp",
    email: "bootcamp@example.com",
    subscribedOn: "2024-10-09",
    duration: "6-months",
    expiration: "2025-04-09",
    amountPaid: "$58",
    type: "Premium",
  },
  {
    id: 2,
    name: "AI Research Tool",
    email: "ai@researcher.io",
    subscribedOn: "2024-09-15",
    duration: "12-months",
    expiration: "2025-09-15",
    amountPaid: "$120",
    type: "Standard",
  },
  {
    id: 3,
    name: "Stock Market Analysis",
    email: "stockguru@finance.com",
    subscribedOn: "2024-11-01",
    duration: "7-months",
    expiration: "2025-06-01",
    amountPaid: "$75",
    type: "Basic",
  },
  {
    id: 4,
    name: "Online Marketing",
    email: "market@adspro.com",
    subscribedOn: "2024-08-12",
    duration: "9-months",
    expiration: "2025-05-12",
    amountPaid: "$95",
    type: "Standard",
  },
  {
    id: 5,
    name: "UI/UX Design",
    email: "uxstudio@designs.io",
    subscribedOn: "2024-10-01",
    duration: "6-months",
    expiration: "2025-04-01",
    amountPaid: "$60",
    type: "Premium",
  },
  {
    id: 6,
    name: "Cybersecurity Training",
    email: "security@safehub.com",
    subscribedOn: "2024-07-20",
    duration: "10-months",
    expiration: "2025-05-20",
    amountPaid: "$110",
    type: "Standard",
  },
  {
    id: 7,
    name: "Web Dev Masterclass",
    email: "webdev@courses.com",
    subscribedOn: "2024-10-10",
    duration: "8-months",
    expiration: "2025-06-10",
    amountPaid: "$88",
    type: "Premium",
  },
  {
    id: 8,
    name: "Digital Illustration",
    email: "art@canvasstudio.io",
    subscribedOn: "2024-09-01",
    duration: "6-months",
    expiration: "2025-03-01",
    amountPaid: "$55",
    type: "Basic",
  },
  {
    id: 9,
    name: "Data Science Bootcamp",
    email: "datasci@bootcamp.io",
    subscribedOn: "2024-11-05",
    duration: "7-months",
    expiration: "2025-06-05",
    amountPaid: "$102",
    type: "Premium",
  },
  {
    id: 10,
    name: "Mobile App Dev",
    email: "apps@buildit.com",
    subscribedOn: "2024-08-18",
    duration: "9-months",
    expiration: "2025-05-18",
    amountPaid: "$98",
    type: "Standard",
  },
  {
    id: 11,
    name: "SEO Fundamentals",
    email: "seo@webboost.net",
    subscribedOn: "2024-09-25",
    duration: "6-months",
    expiration: "2025-03-25",
    amountPaid: "$45",
    type: "Basic",
  },
  {
    id: 12,
    name: "Python Automation",
    email: "py@autobot.ai",
    subscribedOn: "2024-10-20",
    duration: "8-months",
    expiration: "2025-06-20",
    amountPaid: "$70",
    type: "Standard",
  },
];

const SubscriptionTable = () => {
  // Replace with fetched data when ready
  const subscriptions = mockSubscriptions;

  return (
    <CardContainer>
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4">
          <IoSearchOutline className="text-gray-400 mt-1" />
          <input
            placeholder="search subscription"
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
              <th className="px-5 text-left">Name</th>
              <th className="px-5 text-left">Email</th>
              <th className="px-5 text-left">Date of Subscription</th>
              <th className="px-5 text-left">Length</th>
              <th className="px-5 text-left">Expiration Date</th>
              <th className="px-5 text-left">Amount Paid</th>
              <th className="px-5 text-left">Subscription Type</th>
              <th className="px-5"></th>
              <th className="px-5"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-gray-500 text-[13px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.name}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.email}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.subscribedOn}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.duration}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.expiration}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.amountPaid}</td>
                <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">{item.type}</td>
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

export default SubscriptionTable;
