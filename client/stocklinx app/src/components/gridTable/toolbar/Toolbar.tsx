import React from 'react'
import "./toolbar.scss";
import { Column } from '../interfaces/interfaces';
import Dropdown from './Dropdown';

interface ToolbarProps {
    refreshData?: () => void;
    filterData?: () => void;
    handleSearch?: () => void;
    columns: Column[];
    visibleColumns: string[];
    handleVisibleColumns: (columnCaption: string) => void;
    onRowInsert?: () => void;
}
const Toolbar: React.FC<ToolbarProps> = ({ columns, visibleColumns, handleVisibleColumns, onRowInsert }) => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-element">
                <div className="toolbar-element-content">
                    <Dropdown columns={columns} onChange={handleVisibleColumns} visibleColumns={visibleColumns} />
                </div>
            </div>
            <div className="toolbar-element">
                <div className="toolbar-element-content">
                    <div className="toolbar-element-icon">
                        <i className='bx bx-refresh'></i>
                    </div>
                </div>
            </div>
            <div className="toolbar-element">
                <div className="toolbar-element-content">
                    <div className="toolbar-element-icon" onClick={onRowInsert}>
                        <i className='bx bx-plus'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
