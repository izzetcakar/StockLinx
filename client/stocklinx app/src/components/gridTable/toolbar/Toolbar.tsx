import React from 'react'
import "./toolbar.scss";
import { Column } from '../interfaces/interfaces';
import Dropdown from './Dropdown';
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh_outlined from "../../.././assets/icon_refresh_outlined.png";
import ActionIconBtn from '../../generic/ActionIconBtn';

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
            {onRowInsert ? <ActionIconBtn submitFunc={onRowInsert} icon={icon_plus} /> : null}
            {refreshData ? <ActionIconBtn submitFunc={refreshData} icon={icon_refresh_outlined} /> : null}
        </div>
    )
}

export default Toolbar
