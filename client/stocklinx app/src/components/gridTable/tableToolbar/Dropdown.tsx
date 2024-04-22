import React from "react";
import { Menu, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useGridTableContext } from "../context/GenericStateContext";
import "./tableToolbar.scss";
interface DropDownProps {
  onChange: (caption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ onChange }) => {
  const { gridColumns } = useGridTableContext();

  return (
    <Menu withArrow closeOnItemClick={false}>
      <Menu.Target>
        <Button
          variant="default"
          color="dark"
          size="xs"
          rightSection={<IconChevronDown size={16} />}
        >
          Columns
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {gridColumns.map((column) => (
          <Menu.Item
            key={"column__visible__" + column.id}
            onClick={() => onChange(column.caption)}
            bg={column.visible ? "#eaeaea" : "transparent"}
            mb={4}
            py={4}
          >
            {column.caption}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default DropDown;
