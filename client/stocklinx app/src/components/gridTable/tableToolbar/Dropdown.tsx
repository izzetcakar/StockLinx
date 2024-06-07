import { Menu, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useGridTableContext } from "../context/GenericStateContext";
import { useVisible } from "../customhooks/visible";
import "./tableToolbar.scss";

const DropDown = () => {
  const { gridColumns } = useGridTableContext();
  const { onVisibleChange, checkIsVisible } = useVisible();

  return (
    <div>
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
              onClick={() => onVisibleChange(column.id)}
              bg={checkIsVisible(column.id) ? "#eaeaea" : "transparent"}
              mb={4}
              py={4}
            >
              {column.caption}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default DropDown;
