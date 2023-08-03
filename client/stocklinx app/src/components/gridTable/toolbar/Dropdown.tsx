import React from "react";
import { Column } from "../interfaces/interfaces";
import "./toolbar.scss";
import { Menu, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
interface DropDownProps {
    columns: Column[];
    visibleColumns: string[];
    onChange: (columnCaption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ columns, visibleColumns, onChange }) => {

    return (
        <Menu
            withArrow
            closeOnItemClick={false}
        >
            <Menu.Target>
                <Button variant="default" color="dark" size="xs" rightIcon={<IconChevronDown size={16} />}>Columns</Button>
            </Menu.Target>

            <Menu.Dropdown >
                {columns.map((column, index) => (
                    <Menu.Item
                        key={index}
                        onClick={() => onChange(column.caption)}
                        bg={visibleColumns.includes(column.caption) ? '#eaeaea' : 'transparent'}
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
