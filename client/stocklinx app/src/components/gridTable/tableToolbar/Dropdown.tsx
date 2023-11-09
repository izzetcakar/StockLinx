import React from "react";
import { Column, VisibleColumn } from "../interfaces/interfaces";
import "./tableToolbar.scss";
import { Menu, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
interface DropDownProps {
  columns: Column[];
  visibleColumns: VisibleColumn[];
  onChange: (columnCaption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  columns,
  visibleColumns,
  onChange,
}) => {
  return (
    <Menu withArrow closeOnItemClick={false}>
      <Menu.Target>
        <Button
          variant="default"
          color="dark"
          size="xs"
          rightIcon={<IconChevronDown size={16} />}
        >
          Columns
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {columns.map((column) => (
          <Menu.Item
            key={"column__visible__dropdown__" + column.caption}
            onClick={() => onChange(column.caption)}
            bg={
              visibleColumns.map((x) => x.caption).includes(column.caption)
                ? "#eaeaea"
                : "transparent"
            }
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
