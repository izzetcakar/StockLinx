import { Select } from "@mantine/core";
import { useGridTableContext } from "../context/GenericStateContext";

interface ItemPerPageSelectorProps {}

const ItemPerPageSelector: React.FC<ItemPerPageSelectorProps> = () => {
  const { itemPerPage, setItemPerPage } = useGridTableContext();
  return (
    <Select
      data={
        [
          { value: 2, label: "2" },
          { value: 4, label: "4" },
          { value: 24, label: "24" },
          { value: 60, label: "60" },
          { value: 120, label: "120" },
          { value: 240, label: "240" },
          { value: 480, label: "480" },
          { value: 960, label: "960" },
        ] as any
      }
      value={itemPerPage as any}
      onChange={(e) => setItemPerPage(parseInt(e as string))}
      size="xs"
      w={50}
      rightSectionWidth={0}
      leftSection={0}
      rightSection={false}
      styles={{
        input: {
          paddingLeft: 5,
          paddingRight: 5,
        },
      }}
    />
  );
};

export default ItemPerPageSelector;
