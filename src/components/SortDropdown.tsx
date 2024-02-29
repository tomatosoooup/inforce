import React from "react";

const SortDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleSortChange}>
      <option value="alphabetically">Sort Alphabetically</option>
      <option value="count">Sort By Count</option>
    </select>
  );
};

export default SortDropdown;
