import React from "react";
import SelectCheckbox from "../../select/SelectCheckbox";

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
    <SelectCheckbox
      selectFunc={() => selectFunc(rowIndex)}
      selectId={rowIndex.toString()}
      isChecked={isChecked}
    />
  );
};

export default SelectComponent;
