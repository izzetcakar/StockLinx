import React from "react";
import "./select.scss";

interface SelectComponentProps {
  rowIndex: number;
  isChecked: boolean;
  selectFunc: (index: number) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  rowIndex,
  isChecked,
  selectFunc,
}) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={() => selectFunc(rowIndex)} />
  );
};

export default SelectComponent;
