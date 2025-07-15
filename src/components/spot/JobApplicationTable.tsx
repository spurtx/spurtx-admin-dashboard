


// // import { useParams, useNavigate } from "react-router-dom";
// // import CardContainer from "../ui/CardContainer";
// // import { useJobSeekerDetails } from "../../hooks/toolkit/useJobSeekersData";
// // import Skeleton from "../sync/projects/ProjectCardSkeleton";
// // import { FiArrowLeft } from "react-icons/fi";

// // // Define type for application data
// // interface JobApplication {
// //   id: string;
// //   spot: {
// //     company: {
// //       companyName: string;
// //     };
// //     role: string;
// //     jobType: string;
// //     employmentType: string;
// //     currency: string;
// //     salaryMin: number;
// //     salaryMax: number;
// //   };
// //   status: string;
// //   createdAt: string;
// //   jobSeeker: {
// //     firstName: string;
// //     lastName: string;
// //   };
// // }

// // const JobApplicationsTable = () => {
// //   const { userId } = useParams<{ userId: string }>();
// //   const navigate = useNavigate();
// //   const { 
// //   data: responseData, 
// //   isLoading, 
// //   isError,
// //   error
// // } = useJobSeekerDetails(userId || "");

// //   if (isLoading) {
// //     return (
// //       <CardContainer>
// //         <div className="space-y-4">
// //           <Skeleton />
// //           {Array.from({ length: 3 }).map((_, i) => (
// //             <Skeleton key={i} />
// //           ))}
// //         </div>
// //       </CardContainer>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <CardContainer>
// //         <div className="flex justify-center py-10 text-red-500">
// //           {error?.message || "Error loading job applications"}
// //         </div>
// //       </CardContainer>
// //     );
// //   }

// //   // Extract applications from response data
// //   const applications = responseData?.data as JobApplication[] || [];
  
// //   // Get job seeker name from first application (if exists)
// //   const jobSeekerName = applications.length > 0 
// //     ? `${applications[0].jobSeeker.firstName} ${applications[0].jobSeeker.lastName}`
// //     : "Unknown Job Seeker";

// //   const getStatusStyles = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case "accepted":
// //         return "text-green-700 bg-green-100";
// //       case "rejected":
// //         return "text-red-700 bg-red-100";
// //       case "pending":
// //         return "text-yellow-700 bg-yellow-100";
// //       default:
// //         return "text-gray-700 bg-gray-100";
// //     }
// //   };

// //   return (
// //     <CardContainer>
// //       <div className="flex items-center mb-6">
// //         <button 
// //           onClick={() => navigate(-1)} 
// //           className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
// //         >
// //           <FiArrowLeft className="mr-2" /> Back
// //         </button>
// //         <h1 className="text-xl font-semibold">
// //           Job Applications for {jobSeekerName}
// //         </h1>
// //       </div>

// //       {applications.length === 0 ? (
// //         <div className="flex justify-center py-10 text-gray-500">
// //           No applications found for this job seeker
// //         </div>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse">
// //             <thead className="bg-gray-100 text-gray-600 text-[13px] text-start font-semibold">
// //               <tr>
// //                 <th className="py-3 text-start px-3">Company</th>
// //                 <th className="px-5 text-start">Role</th>
// //                 <th className="px-5 text-start">Job Type</th>
// //                 <th className="px-5 text-start">Employment Type</th>
// //                 <th className="px-5 text-start">Salary</th>
// //                 <th className="px-5 text-start">Applied Date</th>
// //                 <th className="px-5 text-start">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {applications.map((application) => (
// //                 <tr key={application.id} className="border-b hover:bg-gray-50">
// //                   <td className="py-3 px-3 text-gray-700 font-medium">
// //                     {application.spot.company.companyName}
// //                   </td>
// //                   <td className="py-3 px-5 text-gray-600">
// //                     {application.spot.role}
// //                   </td>
// //                   <td className="py-3 px-5 text-gray-600">
// //                     {application.spot.jobType}
// //                   </td>
// //                   <td className="py-3 px-5 text-gray-600">
// //                     {application.spot.employmentType}
// //                   </td>
// //                   <td className="py-3 px-5 text-gray-600">
// //                     {application.spot.salaryMin > 0 || application.spot.salaryMax > 0
// //                       ? `${application.spot.currency}${application.spot.salaryMin} - ${application.spot.salaryMax}`
// //                       : "Not specified"}
// //                   </td>
// //                   <td className="py-3 px-5 text-gray-600">
// //                     {new Date(application.createdAt).toLocaleDateString()}
// //                   </td>
// //                   <td className="py-3 px-5">
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
// //                         application.status
// //                       )}`}
// //                     >
// //                       {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </CardContainer>
// //   );
// // };

// // export default JobApplicationsTable;

// import { useParams, useNavigate } from "react-router-dom";
// import CardContainer from "../ui/CardContainer";
// import { useJobSeekerDetails } from "../../hooks/toolkit/useJobSeekersData";
// import Skeleton from "../sync/projects/ProjectCardSkeleton";
// import { FiArrowLeft } from "react-icons/fi";
// import type { UseQueryResult } from '@tanstack/react-query';

// // Define type for application data
// interface JobApplication {
//   id: string;
//   spot: {
//     company: {
//       companyName: string;
//     };
//     role: string;
//     jobType: string;
//     employmentType: string;
//     currency: string;
//     salaryMin: number;
//     salaryMax: number;
//   };
//   status: string;
//   createdAt: string;
// }

// // Match the actual response key: 'applications' not 'jobApplications'
// interface JobSeekerDetails {
//   id: string;
//   firstName: string;
//   lastName: string;
//   applications: JobApplication[];
// }

// const JobApplicationsTable = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const navigate = useNavigate();

//   const {
//     data: responseData,
//     isLoading,
//     isError,
//     error,
//   }: UseQueryResult<JobSeekerDetails, Error> = useJobSeekerDetails(userId || "");

//   if (isLoading) {
//     return (
//       <CardContainer>
//         <div className="space-y-4">
//           <Skeleton />
//           {Array.from({ length: 3 }).map((_, i) => (
//             <Skeleton key={i} />
//           ))}
//         </div>
//       </CardContainer>
//     );
//   }

//   if (isError) {
//     return (
//       <CardContainer>
//         <div className="flex justify-center py-10 text-red-500">
//           {error?.message || "Error loading job applications"}
//         </div>
//       </CardContainer>
//     );
//   }

//   const applications = responseData?.applications || [];
//   const jobSeekerName = responseData
//     ? `${responseData.firstName} ${responseData.lastName}`
//     : "Unknown Job Seeker";

//   const getStatusStyles = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "accepted":
//         return "text-green-700 bg-green-100";
//       case "rejected":
//         return "text-red-700 bg-red-100";
//       case "pending":
//         return "text-yellow-700 bg-yellow-100";
//       default:
//         return "text-gray-700 bg-gray-100";
//     }
//   };

//   return (
//     <CardContainer>
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
//         >
//           <FiArrowLeft className="mr-2" /> Back
//         </button>
//         <h1 className="text-xl font-semibold">
//           Job Applications for {jobSeekerName}
//         </h1>
//       </div>

//       {applications.length === 0 ? (
//         <div className="flex justify-center py-10 text-gray-500">
//           No applications found for this job seeker
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-100 text-gray-600 text-[13px] text-start font-semibold">
//               <tr>
//                 <th className="py-3 text-start px-3">Company</th>
//                 <th className="px-5 text-start">Role</th>
//                 <th className="px-5 text-start">Job Type</th>
//                 <th className="px-5 text-start">Employment Type</th>
//                 <th className="px-5 text-start">Salary</th>
//                 <th className="px-5 text-start">Applied Date</th>
//                 <th className="px-5 text-start">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((application: JobApplication) => (
//                 <tr key={application.id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-3 text-gray-700 font-medium">
//                     {application.spot.company.companyName}
//                   </td>
//                   <td className="py-3 px-5 text-gray-600">
//                     {application.spot.role}
//                   </td>
//                   <td className="py-3 px-5 text-gray-600">
//                     {application.spot.jobType}
//                   </td>
//                   <td className="py-3 px-5 text-gray-600">
//                     {application.spot.employmentType}
//                   </td>
//                   <td className="py-3 px-5 text-gray-600">
//                     {application.spot.salaryMin > 0 || application.spot.salaryMax > 0
//                       ? `${application.spot.currency}${application.spot.salaryMin} - ${application.spot.salaryMax}`
//                       : "Not specified"}
//                   </td>
//                   <td className="py-3 px-5 text-gray-600">
//                     {new Date(application.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
//                         application.status
//                       )}`}
//                     >
//                       {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </CardContainer>
//   );
// };

// export default JobApplicationsTable;
