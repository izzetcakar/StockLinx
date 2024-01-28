import { Select } from "@mantine/core";
import { useGridTableContext } from "../context/GenericStateContext";

interface PerPageSelectorProps {}

const PerPageSelector: React.FC<PerPageSelectorProps> = () => {
  const { itemPerPage, setItemPerPage } = useGridTableContext();
  return (
    <Select
      data={
        [
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
      iconWidth={0}
      icon={false}
      rightSection={false}
      styles={{
        input: {
          paddingLeft: 5,
          paddingRight: 5,
        },
      }}
      withinPortal
    />
  );
};

export default PerPageSelector;
