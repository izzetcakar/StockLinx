import SelectCheckbox from "../../select/SelectCheckbox";

const SelectComponent = ({ rowIndex, isChecked, selectFunc }) => {
  return (
    <SelectCheckbox
      selectFunc={() => selectFunc(rowIndex)}
      selectId={rowIndex}
      isChecked={isChecked}
    />
  );
};
export default SelectComponent;
