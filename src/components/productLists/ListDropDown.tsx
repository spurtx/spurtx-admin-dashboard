
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ListDropDown = ({
  name,
  className,
  details = [],
  buttonText = "Add Skill",
}: {
  name: string;
  className?: string;
  details?: string[];
  buttonText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b ${className}`}>
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-gradient-to-r from-primary to-secondary px-4 py-3 flex justify-between items-center"
      >
        <p className="font-medium text-white">{name}</p>
        {isOpen ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="bg-white">
          {details.map((detail, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-4 py-2 border-b last:border-none"
            >
              <p className="text-gray-700 text-sm">{detail}</p>
              <MdEdit className="text-gray-500 cursor-pointer" />
            </div>
          ))}

          {/* Reusable Button */}
          <div className="px-4 py-4">
            <button className="w-full text-white font-semibold py-2 rounded-md bg-gradient-to-r from-primary to-secondary">
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDropDown;
