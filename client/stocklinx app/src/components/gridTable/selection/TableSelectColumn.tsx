import TableCheckbox from './TableCheckbox'
import { hasAllElements } from '../../../functions/hasAllElements'
import { getIndexesFromArray } from '../../../functions/getIndexesFromArray'

interface TableSelectColumnProps {
    datagrid: object[];
    selectedIndexes: number[];
    filterData: () => object[];
    setSelectedIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    handleClassByIndex: (index: number) => string;
}

const TableSelectColumn: React.FC<TableSelectColumnProps> = ({
    datagrid,
    selectedIndexes,
    filterData,
    setSelectedIndexes,
    handleClassByIndex
}) => {
    const handleSelectRow = (index: number) => {
        setSelectedIndexes((prevIndexes) =>
            prevIndexes.includes(index)
                ? prevIndexes.filter((i) => i !== index)
                : [...prevIndexes, index]
        );
    };

    const handleSelectAll = () => {
        setSelectedIndexes((prevIndexes) =>
            hasAllElements(getIndexesFromArray(filterData()), prevIndexes)
                ? []
                : getIndexesFromArray(datagrid)
        );
    };

    return (
        <div className="column-container">
            <div className="column-title">
                <TableCheckbox
                    isChecked={hasAllElements(
                        getIndexesFromArray(filterData()),
                        selectedIndexes
                    )}
                    selectFunc={handleSelectAll}
                />
            </div>
            {getIndexesFromArray(filterData()).map((_, index) => (
                <div className={handleClassByIndex(index)} key={index}>
                    <TableCheckbox
                        isChecked={selectedIndexes.includes(index)}
                        selectFunc={() => handleSelectRow(index)}
                    />
                </div>
            ))}
        </div>
    )
}

export default TableSelectColumn