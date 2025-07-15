

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

interface ListItem {
  id: string;
  name: string;
}

const ListDropDown = ({
  name,
  className,
  items = [],
  buttonText = "Add New",
  onAdd,
  onDelete,
}: {
  name: string;
  className?: string;
  items?: ListItem[];
  buttonText?: string;
  onAdd: () => void;
  onDelete: (id: string) => void;
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
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center px-4 py-2 border-b gap-1 border-t last:border-none"
            >
              <p className="text-gray-700 text-sm">{item.name}</p>
              <button 
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
          ))}

          <div className="py-4">
            <button 
              onClick={onAdd}
              className="w-30 text-white font-semibold py-2 rounded-md bg-gradient-to-r from-primary to-secondary"
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDropDown;
