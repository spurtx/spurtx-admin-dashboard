
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchInput = ({
  placeholder,
  value,
  onChange,
  className = "",
}: SearchInputProps) => {
  return (
    <div className={`flex items-center gap-3 border border-gray-400 rounded-[5px] w-[300px] py-1 px-4 ${className}`}>
      <IoSearchOutline className="text-gray-400 mt-1" />
      <input
        placeholder={placeholder}
        className="text-gray-600 outline-none bg-transparent w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};