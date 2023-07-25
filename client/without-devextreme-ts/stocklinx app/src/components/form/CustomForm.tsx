import React, { useEffect, useState } from 'react'
import { Column } from '../gridTable/interfaces/interfaces';
import "./customForm.scss"
import { checkEmpty } from '../../functions/checkEmpty';
import SelectCheckbox from '../select/SelectCheckbox';

interface CustomFormProps {
    object?: object;
    columns?: Column[];
    submitFunc: (data: object) => void;
    // onRowUpdate: (row: object) => void;
    // onRowDelete: (row: object) => void;
    // onStartEdit?: (row: object) => void;
}
const CustomForm: React.FC<CustomFormProps> = ({
    object = {},
    columns = [],
    submitFunc = () => { },
}) => {
    const [dataColumns, setDataColumns] = useState<Column[]>(columns);
    const [data, setData] = useState<object>(object);

    useEffect(() => {
        setData(object);
    }, [object]);

    useEffect(() => {
        setDataColumns(handleColumnsEmpty(columns));
    }, [columns]);

    const handleData = (property: string, value: any) => {
        setData((prev) => ({ ...prev, [property]: value }));
    };

    const handleColumnsEmpty = (cols: Column[]): Column[] => {
        if (!checkEmpty(cols) && checkEmpty(data)) {
            const newColumns: Column[] = Object.keys(data).map((dataField) => ({
                dataField,
                caption: dataField,
                dataType: typeof dataField,
            }));
            return newColumns;
        }
        return cols;
    };
    const renderData = (column: Column) => {
        let value = (data as { [key: string]: any })[column.dataField];

        // if (column.renderComponent) {
        //     const RenderComponent = column.renderComponent;
        //     return <RenderComponent value={value} />;
        // }

        if (column.dataType === "boolean") {
            return (
                <SelectCheckbox
                    selectFunc={() => handleData(column.dataField, !value)}
                    selectId={"form-select-" + column.dataField}
                    isChecked={value}
                />
            );
        }

        if (value === null || value === undefined) {
            value = "";
        }

        return (
            <input
                id={"form-input-" + column.dataField}
                name={"form-input-" + column.dataField}
                type={column.dataType}
                value={value}
                onChange={(e: any) => handleData(column.dataField, e.target.value)}>
            </input>
        )
    };

    return (
        <div className="form-container" onSubmit={() => submitFunc(data)}>
            <div className="form-content">
                {dataColumns.map((column, index) => (
                    <div className="form-input" key={index}>
                        <div className="label-container">
                            <label htmlFor={column.dataField}>{column.caption}</label>
                        </div>
                        <div className="input-container">
                            {renderData(column)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="form-button">
                <button type="submit">Submit</button>
            </div>
        </div>
    )
}

export default CustomForm