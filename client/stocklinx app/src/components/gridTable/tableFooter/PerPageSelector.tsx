import { Select } from "@mantine/core";

interface PerPageSelectorProps {
  handleItemPerPage: (e: any) => void;
  itemPerPage: number;
}
const PerPageSelector: React.FC<PerPageSelectorProps> = ({
  handleItemPerPage,
  itemPerPage,
}) => {
  return (
    <Select
      data={
        [
          { value: 5, label: "5" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
        ] as any
      }
      value={itemPerPage as any}
      onChange={handleItemPerPage}
      size="xs"
      w={60}
    />
  );
};

export default PerPageSelector;
