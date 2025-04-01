// import React, { useState } from "react";

// interface ButtonProps {
//   className?: string;
//   selectOptions: string[];
//   initialSelected: string;
// }

// const GradientButton: React.FC<ButtonProps> = ({
//   className,
//   selectOptions,
//   initialSelected,
// }) => {
//   const [selected, setSelected] = useState<string>(initialSelected);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (option: string) => {
//     setSelected(option);
//     setIsOpen(false);
//   };
//   return (
//     <div className="relative">
//       <div className="bg-gradient-to-r from-[#00A15D] to-[#C16407] rounded-md p-[1.2px] inline-block">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`bg-white text-black px-4 py-2 rounded-md flex justify-between items-center ${className}`}
//         >
//           {initialSelected}
//           <span className="ml-2">&#9662;</span>
//         </button>
//       </div>

//       {isOpen && (
//         <div className="absolute mt-1 bg-white border border-gray-300 shadow-md rounded-md">
//           {selectOptions.map((option) => (
//             <button
//               key={option}
//               onClick={() => handleSelect(option)}
//               className="w-auto text-left px-4 py-2 hover:bg-gray-100"
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GradientButton;

import React, { useState } from "react";

interface ButtonProps {
  className?: string;
  selectOptions: string[];
  initialSelected: string;
}

const GradientButton: React.FC<ButtonProps> = ({
  className,
  selectOptions,
  initialSelected,
}) => {
  const [selected, setSelected] = useState<string>(initialSelected);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative cursor-pointer ${className}`}>
      <div className="bg-gradient-to-r from-[#00A15D] to-[#C16407] rounded-md p-[1.2px] ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#EEFFF8] text-black p-1 rounded-md flex gap-2 justify-between items-center w-full"
        >
          <p className="bg-gradient-to-r from-[#00A15D] to-[#C16407] bg-clip-text text-transparent">
            {selected}
          </p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#00A15D", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#C16407", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M6 9l6 6 6-6"
              stroke="url(#grad1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 shadow-md rounded-md w-full z-30">
          {selectOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradientButton;
