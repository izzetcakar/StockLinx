import React from "react";
import "./tableCheckbox.scss";

interface TableCheckboxProps {
  isChecked: boolean;
  selectFunc: () => void;
}

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  isChecked,
  selectFunc,
}) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={selectFunc} />
  );
};

export default TableCheckbox;
