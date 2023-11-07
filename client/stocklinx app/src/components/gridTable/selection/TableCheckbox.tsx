import React from "react";
import { Checkbox } from "@mantine/core";

interface TableCheckboxProps {
  isChecked: boolean;
  selectFunc: () => void;
}

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  isChecked,
  selectFunc,
}) => {
  return (
    <Checkbox
      checked={isChecked}
      onChange={selectFunc}
    />
  );
};

export default TableCheckbox;
