import { Select } from "@mantine/core";
import { useGridTableContext } from "../context/GenericStateContext";

interface PerPageSelectorProps {
  handleItemPerPage: (e: any) => void;
}

const PerPageSelector: React.FC<PerPageSelectorProps> = ({
  handleItemPerPage,
}) => {
  const { itemPerPage } = useGridTableContext();
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
      withinPortal
    />
  );
};

export default PerPageSelector;
