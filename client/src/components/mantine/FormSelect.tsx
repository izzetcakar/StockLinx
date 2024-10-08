import { Loader, Select } from "@mantine/core";

interface FormSelectProps {
  data?: { value: string; label: string }[] | undefined;
  label?: string;
  inputProps: object;
  value: string | null;
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: string | null) => void;
  fetchData?: () => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  data,
  label,
  inputProps,
  value,
  required,
  loading,
  disabled,
  fetchData,
  onChange,
}) => {
  const placeholder = label ? `Select ${label}` : "Select";
  const nothingFound = label ? `No ${label} found` : "Nothing found";
  return (
    <Select
      data={loading || !data ? [] : data}
      label={label || ""}
      placeholder={placeholder}
      {...inputProps}
      value={value || ""}
      {...(onChange
        ? {
            onChange: (value) => {
              onChange(value);
            },
          }
        : {})}
      nothingFoundMessage={loading ? <Loader size={16} /> : nothingFound}
      comboboxProps={{
        position: "bottom",
        middlewares: { flip: true, shift: false },
      }}
      onDropdownOpen={fetchData}
      // rightSection={loading ? <Loader size={16} /> : null}
      maxDropdownHeight={200}
      required={required}
      withAsterisk={required}
      disabled={disabled}
      clearable
      searchable
    />
  );
};

export default FormSelect;
