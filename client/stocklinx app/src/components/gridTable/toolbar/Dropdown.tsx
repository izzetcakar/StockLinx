import React from "react";
import { Column } from "../interfaces/interfaces";
import SelectCheckbox from "../../select/SelectCheckbox";
import "./toolbar.scss";

interface DropDownProps {
    columns: Column[];
    visibleColumns: string[];
    onChange: (columnCaption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ columns, visibleColumns, onChange }) => {
    const [visible, setVisible] = React.useState<boolean>(false);

    const handleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div className="dropdown-container" onClick={() => handleVisible()}>
                <div className="dropdown-title" >Columns</div>
                <i className='bx bx-chevron-down' style={{ fontSize: "1.4rem", color: "#737373" }}></i>
            </div>
            <div className={`dropdown-content ${visible ? 'visible' : ''}`}>
                {columns.map((column, index) => (
                    <div className="dropdown-element" key={index}>
                        <SelectCheckbox
                            selectId={"Visible" + column.caption}
                            isChecked={visibleColumns.includes(column.caption)}
                            selectFunc={() => onChange(column.caption)}
                        />
                        <div className="title">{column.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(DropDown);
