import { ActionIcon, Menu } from "@mantine/core";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import filterClasses from "../../../mantineModules/baseFilter.module.scss";

interface ExcelButtonProps {
  onDownloadTemplate: () => void;
  onExportAll: () => void;
  onExportSelected: () => void;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  onDownloadTemplate,
  onExportAll,
  onExportSelected,
}) => {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="bottom-end"
      width="auto"
      
      classNames={filterClasses}
    >
      <Menu.Target>
        {/* <Button
          rightSection={
            <IconChevronDown
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          size="xs"
        >
          Excel
        </Button> */}
        <ActionIcon style={{ border: "none" }}>
          <IconFileSpreadsheet />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onDownloadTemplate()}>
          Base Excel Sheet
        </Menu.Item>
        <Menu.Item onClick={() => onExportAll()}>Export All</Menu.Item>
        <Menu.Item onClick={() => onExportSelected()}>
          Export Selected Items
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ExcelButton;
