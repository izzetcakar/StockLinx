import { Select } from "@mantine/core";
import filterClasses from "../../mantineModules/baseFilter.module.scss";

interface FormSelectProps {
  data: { value: string; label: string }[];
  label: string;
  value: string;
  inputProps: object;
  clearable?: boolean;
  withAsterisk?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  data,
  label,
  value,
  inputProps,
  clearable,
  withAsterisk,
}) => {
  return (
    <Select
      data={data}
      label={label}
      placeholder={`Select ${label}`}
      {...inputProps}
      value={value}
      classNames={filterClasses}
      nothingFoundMessage={`No ${label.toLowerCase()} found`}
      comboboxProps={{
        position: "bottom",
        middlewares: { flip: true, shift: false },
      }}
      clearable={clearable}
      withAsterisk={withAsterisk}
    />
  );
};

export default FormSelect;
