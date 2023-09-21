import React from 'react'
import "./tableToolbar.scss";
import { Column } from '../interfaces/interfaces';
import Dropdown from './Dropdown';
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh_outlined from "../../.././assets/icon_refresh_outlined.png";
import ActionIconBtn from '../../generic/ActionIconBtn';

interface TableToolbarProps {
    refreshData?: () => Promise<void> | void;
    filterData?: () => void;
    handleSearch?: () => void;
    columns: Column[];
    visibleColumns: string[];
    handleVisibleColumns: (columnCaption: string) => void;
    onRowInsert?: () => void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({ columns, visibleColumns, refreshData, handleVisibleColumns, onRowInsert }) => {

    return (
        <div className="table-toolbar-container">
            <div className="table-toolbar-element">
                <div className="table-toolbar-element-content">
                    <Dropdown columns={columns} onChange={handleVisibleColumns} visibleColumns={visibleColumns} />
                </div>
            </div>
            {onRowInsert ? <ActionIconBtn submitFunc={onRowInsert} icon={icon_plus} /> : null}
            {refreshData ? <ActionIconBtn submitFunc={refreshData} icon={icon_refresh_outlined} /> : null}
        </div>
    )
}

export default TableToolbar
