import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

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
    <div className={`${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-gradient-to-r from-primary to-secondary px-4 py-3 flex justify-between items-center"
      >
        <p className="font-medium text-white">{name}</p>
        {isOpen ? (
          <FaChevronDown className="text-white" />
        ) : (
          <RiArrowRightSLine className="text-white text-[24px]" />
        )}
      </div>

      {isOpen && (
        <div className="bg-white">
          {details.map((detail, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-4 py-2 border-b gap-1 border-t last:border-none"
            >
              <p className="text-gray-700 text-sm">{detail}</p>
              <BiEditAlt className="text-gray-500 cursor-pointer" />
            </div>
          ))}

          <div className="py-4">
            <button className="w-30 text-white font-semibold py-2 rounded-md bg-gradient-to-r from-primary to-secondary">
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDropDown;
