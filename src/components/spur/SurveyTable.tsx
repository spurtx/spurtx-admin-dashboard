// import { RiDeleteBin6Line } from "react-icons/ri";
// import GradientDots from "../ui/GradientDots";


// const dummyData = [
//     {
//       id: 1,
//       title: "Q1 Performance Review",
//       date: "2025-12-12",
//       company: "Synergy Corp",
//       responses: 3,
//       status: "Published",
//     },
//     {
//       id: 2,
//       title: "Team Growth Feedback",
//       date: "2025-12-12",
//       company: "NexTech Solutions",
//       responses: 0,
//       status: "Not Published",
//     },
//     {
//       id: 3,
//       title: "Mid-Year Appraisal",
//       date: "2025-12-12",
//       company: "Orbital Systems",
//       responses: 7,
//       status: "Published",
//     },
//     {
//       id: 4,
//       title: "Innovation Insights",
//       date: "2025-12-12",
//       company: "FutureWorks",
//       responses: 5,
//       status: "Published",
//     },
//     {
//       id: 5,
//       title: "Annual Performance Check",
//       date: "2025-12-12",
//       company: "Vanta Technologies",
//       responses: 1,
//       status: "Not Published",
//     },
//     {
//       id: 6,
//       title: "Team Wellness Survey",
//       date: "2025-12-12",
//       company: "NovaGroup",
//       responses: 4,
//       status: "Published",
//     },
//   ];


// const SurveyTable = () => {
//   return (
//     <div>
//         <table className="w-full border-collapse">
//           <thead className="text-white text-[13px] text-start font-normal bg-gradient-to-r from-[#00A15D] to-[#C16407]">
//             <tr>
//               <th className="py-3 text-start px-3">S/N</th>
//               <th className="px-5 text-start">Survey Title</th>
//               <th className="px-5 text-start">Date</th>
//               <th className="px-5 text-start">Company</th>
//               <th className="px-5 text-start">Number of Responses</th>
//               <th className="px-5 text-start">Status</th>
//               <th className="px-5"></th>
//               <th className="px-5"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {dummyData.map((item, index) => (
//               <tr key={item.id}>
//                 <td className="p-2 text-gray-500 text-[13px] font-semibold">
//                   {index + 1}
//                 </td>
//                 <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
//                   {item.title}
//                 </td>
//                 <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
//                   {item.date}
//                 </td>
//                 <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
//                   {item.company}
//                 </td>
//                 <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
//                   {item.responses}
//                 </td>
//                 <td className="py-2 px-5 text-[13px] font-semibold">
//                   <div
//                     className={`${
//                       item.status === "Published"
//                         ? "bg-green-100 text-primary"
//                         : "bg-gray-200 text-gray-600"
//                     } text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
//                   >
//                     <span>{item.status}</span>
//                   </div>
//                 </td>
//                 <td className="py-2 px-5 text-center">
//                   <RiDeleteBin6Line className="text-red-500 cursor-pointer" />
//                 </td>
//                 <td>
//                   <GradientDots />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//   )
// }

// export default SurveyTable

import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import GradientDots from "../ui/GradientDots";
import { useSurveyData } from "../../hooks/templates/useSurveyData";

type SurveyTemplate = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  description: string;
  dueDate: string | null;
  dueDay: string | null;
  interval: string;
  type: string;
  anonymous: boolean;
};

type SurveyTemplatesResponse = {
  status: string;
  message: string;
  data: {
    pageMetaDto: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    result: SurveyTemplate[];
  };
};

const SurveyTable = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { getTemplates, deleteTemplate } = useSurveyData();
  
  // Get templates data
  const { 
    data: apiResponse, 
    isLoading, 
    isError 
  } = getTemplates({ take: 10 }) as {
    data: SurveyTemplatesResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  // Extract templates from API response
  const templates = apiResponse?.data?.result || [];

  // Handle delete
  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteTemplate().mutate(id, {
      onSuccess: () => {
        setDeletingId(null);
      },
      onError: (error) => {
        console.error("Delete failed:", error);
        setDeletingId(null);
      }
    });
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Determine status based on type
  const getStatus = (type: string) => {
    return type === "draft" ? "Not Published" : "Published";
  };

  return (
    <div>
      <table className="w-full border-collapse">
        <thead className="text-white text-[13px] text-start font-normal bg-gradient-to-r from-[#00A15D] to-[#C16407]">
          <tr>
            <th className="py-3 text-start px-3">S/N</th>
            <th className="px-5 text-start">Survey Title</th>
            <th className="px-5 text-start">Created Date</th>
            <th className="px-5 text-start">Updated Date</th>
            <th className="px-5 text-start">Status</th>
            <th className="px-5"></th>
            <th className="px-5"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="py-4 text-center">
                Loading surveys...
              </td>
            </tr>
          )}
          
          {isError && (
            <tr>
              <td colSpan={7} className="py-4 text-center text-red-500">
                Error loading survey data
              </td>
            </tr>
          )}
          
          {!isLoading && !isError && templates.length === 0 && (
            <tr>
              <td colSpan={7} className="py-4 text-center">
                No surveys found
              </td>
            </tr>
          )}
          
          {templates.map((template, index) => (
            <tr key={template.id}>
              <td className="p-2 text-gray-500 text-[13px] font-semibold">
                {index + 1}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {template.title}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {formatDate(template.createdAt)}
              </td>
              <td className="py-2 px-5 text-gray-500 text-[13px] font-semibold">
                {template.updatedAt ? formatDate(template.updatedAt) : "-"}
              </td>
              <td className="py-2 px-5 text-[13px] font-semibold">
                <div
                  className={`${
                    getStatus(template.type) === "Published"
                      ? "bg-green-100 text-primary"
                      : "bg-gray-200 text-gray-600"
                  } text-sm w-30 flex justify-center rounded-[17px] px-3 py-1.5`}
                >
                  <span>{getStatus(template.type)}</span>
                </div>
              </td>
              <td className="py-2 px-5 text-center">
                <RiDeleteBin6Line 
                  className={`cursor-pointer ${
                    deletingId === template.id ? "text-gray-400" : "text-red-500"
                  }`}
                  onClick={() => handleDelete(template.id)}
                  
                />
                {deletingId === template.id && (
                  <span className="text-xs text-gray-500 ml-2">Deleting...</span>
                )}
              </td>
              <td>
                <GradientDots />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyTable;