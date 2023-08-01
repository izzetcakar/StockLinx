import React from 'react'
import "./toolbar.scss";
import { Column } from '../interfaces/interfaces';
import Dropdown from './Dropdown';
import { ActionIcon } from '@mantine/core';
import { IconPlus, IconRefresh } from '@tabler/icons-react';

interface ToolbarProps {
    refreshData?: () => Promise<void> | void;
    filterData?: () => void;
    handleSearch?: () => void;
    columns: Column[];
    visibleColumns: string[];
    handleVisibleColumns: (columnCaption: string) => void;
    onRowInsert?: () => void;
}
const Toolbar: React.FC<ToolbarProps> = ({ columns, visibleColumns, refreshData, handleVisibleColumns, onRowInsert }) => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-element">
                <div className="toolbar-element-content">
                    <Dropdown columns={columns} onChange={handleVisibleColumns} visibleColumns={visibleColumns} />
                </div>
            </div>
            <div className="toolbar-element">
                <ActionIcon onClick={refreshData}>
                    <IconRefresh color='black' size={20} />
                </ActionIcon>
            </div>
            <div className="toolbar-element">
                <ActionIcon onClick={onRowInsert}>
                    <IconPlus color='black' size={20} />
                </ActionIcon>
            </div>
        </div>
    )
}

export default Toolbar
