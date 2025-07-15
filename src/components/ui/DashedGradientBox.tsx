// // DashedGradientBox.tsx
// const DashedGradientBox = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="relative w-36">
//       <svg
//         className="absolute inset-0 w-full h-full rounded-[5px]"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <rect
//           x="2"
//           y="2"
//           width="100%"
//           height="100%"
//           rx="5"
//           ry="5"
//           fill="none"
//           stroke="url(#gradient)"
//           strokeWidth="4"
//           strokeDasharray="6,4"
//         />
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#00A15D" />
//             <stop offset="100%" stopColor="#C16407" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div className="relative bg-white rounded-[5px] py-1 flex justify-center">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default DashedGradientBox;

const DashedGradientBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-44 rounded-[5px] overflow-visible">
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 148 48" // adjust as needed
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A15D" />
            <stop offset="100%" stopColor="#C16407" />
          </linearGradient>
        </defs>
        <rect
          x="0.5"
          y="0.5"
          width="140"
          height="44"
          rx="5"
          ry="5"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeDasharray="8,6"
        />
      </svg>

      <div className="relative z-10 bg-white rounded-[5px] py-2 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default DashedGradientBox;

