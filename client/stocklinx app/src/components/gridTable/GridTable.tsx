import React, { useState, useEffect, useCallback, useMemo } from "react";
import { checkEmpty } from "../../functions/checkEmpty";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column } from "./interfaces/interfaces";
import TableCheckbox from "./selection/TableCheckbox";
import { hasAllElements } from "../../functions/hasAllElements";
import PageNumber from "./tableFooter/PageNumber";
import "./gridTable.scss";

interface GridTableProps {
  data: object[];
  columns?: Column[];
  noDataText?: string;
  pageSizes?: number[];
  itemPerPage?: number;
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (row: object) => void;
}

const GridTable: React.FC<GridTableProps> = ({
  data = [],
  columns = [],
  itemPerPage = 10,
  refreshData,
  onRowInsert = () => console.log("insert"),
  onRowUpdate = () => console.log("update"),
  onRowRemove = () => console.log("delete"),
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  useEffect(() => {
    setDataColumns(handleColumnsEmpty(columns));
  }, [data]);

  const addVisibleColumn = (columnCaption: string): void => {
    setVisibleColumns((prev) =>
      prev.includes(columnCaption)
        ? prev.filter((item) => item !== columnCaption)
        : [...prev, columnCaption]
    );
  };
  const filterData = useCallback(() => {
    if (pageNumber === 0) {
      return data.slice(0, itemPerPage);
    }
    return data.slice(pageNumber * itemPerPage, (pageNumber + 1) * itemPerPage);
  }, [data, itemPerPage, pageNumber]);

  const cellValues = useMemo(() => {
    return filterData().map((_, rowIndex) => {
      return dataColumns.map((column) => {
        if (visibleColumns.includes(column.caption)) {
          const value = (
            data[rowIndex + itemPerPage * pageNumber] as {
              [key: string]: string | number | boolean | null;
            }
          )[column.dataField];

          if (column.renderComponent) {
            return column.renderComponent(value);
          }
          if (value === null || value === undefined) {
            return "";
          }
          if (typeof value === "boolean") {
            const name = value ? "check" : "x";
            const color = value ? "#63bd4f" : "#ed6b6b";
            return (
              <i
                className={`bx bx-${name}`}
                style={{ fontSize: "1.5rem", color: color }}
              />
            );
          }
          return value;
        }
        return null;
      });
    });
  }, [data, dataColumns, filterData, itemPerPage, pageNumber, visibleColumns]);

  const handleColumnsEmpty = useCallback(
    (cols: Column[]): Column[] => {
      if (!checkEmpty(cols)) {
        const newColumns = Object.keys(data[0]).map((dataField) => ({
          dataField,
          caption: dataField,
        }));
        setVisibleColumns(newColumns.map((item) => item.caption));
        return newColumns;
      }
      setVisibleColumns(cols.map((item) => item.caption));
      return cols;
    },
    [data]
  );

  const handleSelectAll = () => {
    setSelectedIndexes((prevIndexes) =>
      hasAllElements(getIndexesFromArray(filterData()), prevIndexes)
        ? []
        : getIndexesFromArray(data)
    );
  };
  const handleSelectRow = (index: number) => {
    setSelectedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };
  const handlePageNumber = (forward: boolean) => {
    if (forward) {
      if (pageNumber + 1 < data.length / itemPerPage) {
        setPageNumber((prev) => prev + 1);
      }
    } else {
      if (pageNumber - 1 >= 0) {
        setPageNumber((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="all-wrapper">
      {/* <div className="table">
        <TableToolbar
          columns={dataColumns}
          visibleColumns={visibleColumns}
          addVisibleColumn={addVisibleColumn}
          onRowInsert={onRowInsert}
          refreshData={handleRefreshData}
        />
        <div className="table-wrapper">
          {enableSelection ? (
            <TableSelectColumn
              data={data}
              selectedIndexes={selectedIndexes}
              filterData={filterData}
              setSelectedIndexes={setSelectedIndexes}
              handleClassByIndex={handleClassByIndex}
            />
          ) : null}
          <div className="table-content">
            {dataColumns.map((column, columnIndex) =>
              visibleColumns.includes(column.caption) ? (
                <div className="table-column" key={columnIndex}>
                  <div className="table-column-title">{column.caption}</div>
                  {filterData().map((_, rowIndex) => (
                    <div
                      className={handleClassByIndex(rowIndex)}
                      key={rowIndex}
                    >
                      {renderColumnValue(rowIndex, column)}
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
          {enableEdit ? (
            <div className="table-column">
              <div className="table-column-title"></div>
              {getIndexesFromArray(filterData()).map((_, index) => (
                <div className={handleClassByIndex(index)} key={index}>
                  <EditComponent
                    data={data}
                    index={index}
                    onRowUpdate={onRowUpdate}
                    onRowRemove={onRowRemove}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <PageSizeComponent
            showPageSize={showPageSize}
            showPageSizeInfo={showPageSizeInfo}
            showPageSizeSelector={showPageSizeSelector}
            allItemsCount={data.length}
            handleSizeSelect={handleSelectedPageSize}
            pageSizes={pageSizes}
            selectedCount={selectedIndexes.length}
            selectedSize={selectedPageSize}
          />
        </div>
      </div> */}
      <table>
        <thead>
          <tr className="table2-toolbar">
            <td className="table2-toolbar" colSpan={visibleColumns.length + 1}>
              <TableToolbar
                columns={dataColumns}
                visibleColumns={visibleColumns}
                addVisibleColumn={addVisibleColumn}
                onRowInsert={onRowInsert}
                refreshData={refreshData}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <TableCheckbox
                isChecked={hasAllElements(
                  getIndexesFromArray(filterData()),
                  selectedIndexes
                )}
                selectFunc={handleSelectAll}
              />
            </td>
            {visibleColumns.map((column) => (
              <td key={column}>{column}</td>
            ))}
            <td></td>
          </tr>
          {cellValues.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <TableCheckbox
                  isChecked={selectedIndexes.includes(rowIndex)}
                  selectFunc={() => handleSelectRow(rowIndex)}
                />
              </td>
              {row.map((cellValue, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cellValue}</td>
              ))}
              <td>
                <EditComponent
                  data={data}
                  index={rowIndex}
                  onRowUpdate={onRowUpdate}
                  onRowRemove={onRowRemove}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table2-footer">
            <td className="table2-footer" colSpan={visibleColumns.length + 1}>
              <PageNumber
                pageNumber={pageNumber}
                itemPerPage={itemPerPage}
                dataLength={data.length}
                handlePageNumber={handlePageNumber}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GridTable;
