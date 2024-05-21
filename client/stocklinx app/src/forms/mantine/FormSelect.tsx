import { Select } from "@mantine/core";

interface FormSelectProps {
  data: { value: string; label: string }[];
  label: string;
  inputProps: object;
  value: string | null;
  clearable?: boolean;
  required?: boolean;
  onChange?: (value: string | null) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  data,
  label,
  inputProps,
  value,
  clearable,
  required,
  onChange,
}) => {
  return (
    <Select
      data={data}
      label={label}
      placeholder={`Select ${label}`}
      {...inputProps}
      value={value}
      {...(onChange
        ? {
            onChange: (value) => {
              onChange(value);
            },
          }
        : {})}
      nothingFoundMessage={`No ${label.toLowerCase()} found`}
      comboboxProps={{
        position: "bottom",
        middlewares: { flip: true, shift: false },
      }}
      maxDropdownHeight={200}
      clearable={clearable}
      required={required}
      withAsterisk={required}
    />
  );
};

export default FormSelect;
