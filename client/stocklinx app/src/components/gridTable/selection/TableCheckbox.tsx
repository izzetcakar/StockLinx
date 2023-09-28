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
    <div className="it">
      <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={selectFunc}
      />
    </div>
  );
};

export default TableCheckbox;
