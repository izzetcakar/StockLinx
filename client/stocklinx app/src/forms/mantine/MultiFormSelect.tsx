import { Loader, MultiSelect } from "@mantine/core";

interface MultiFormSelectProps {
  data?: { value: string; label: string }[] | undefined;
  label?: string;
  inputProps: object;
  value: string[];
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fetchData?: () => void;
}

const MultiFormSelect: React.FC<MultiFormSelectProps> = ({
  data,
  label,
  inputProps,
  value,
  required,
  loading,
  disabled,
  fetchData,
}) => {
  const placeholder = label ? `Select ${label}` : "Select";
  const nothingFound = label ? `No ${label} found` : "Nothing found";
  return (
    <MultiSelect
      data={loading || !data ? [] : data}
      label={label || ""}
      placeholder={placeholder}
      {...inputProps}
      value={value || []}
      nothingFoundMessage={nothingFound}
      comboboxProps={{
        position: "bottom",
        middlewares: { flip: true, shift: false },
      }}
      onDropdownOpen={fetchData}
      rightSection={loading ? <Loader size={16} /> : null}
      maxDropdownHeight={200}
      required={required}
      withAsterisk={required}
      disabled={disabled}
      clearable
      searchable
    />
  );
};

export default MultiFormSelect;
