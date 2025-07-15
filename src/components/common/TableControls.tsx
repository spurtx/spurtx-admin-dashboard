// components/common/TableControls.tsx
import { SearchInput } from "./SearchInput";
import { SortButton } from "./SortButton";
import { ExportButton } from "./ExportButton";

interface TableControlsProps {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSort: () => void;
  onExport: () => void;
  className?: string;
}

export const TableControls = ({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSort,
  onExport,
  className = "",
}: TableControlsProps) => {
  return (
    <div className={`flex justify-between mb-4 ${className}`}>
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
      />
      <div className="flex gap-3">
        <SortButton onClick={onSort} />
        <ExportButton onClick={onExport} />
      </div>
    </div>
  );
};