import React from "react";
import { Checkbox } from '@mantine/core';

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
    <Checkbox checked={isChecked} onChange={() => selectFunc(rowIndex)} color="dark" />
  );
};

export default SelectComponent;
