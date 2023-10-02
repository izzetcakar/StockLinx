import React, { useState, useEffect, useCallback, useMemo } from "react";
import { checkEmpty } from "../../functions/checkEmpty";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column } from "./interfaces/interfaces";
import PageNumber from "./tableFooter/PageNumber";
import TableCheckbox from "./selection/TableCheckbox";
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
  itemKey: string;
}

const GridTable: React.FC<GridTableProps> = ({
  data = [],
  columns = [],
  itemPerPage = 10,
  refreshData,
  onRowInsert = () => console.log("Row insert"),
  onRowUpdate = (e: object) => console.log(e),
  onRowRemove = (e: object) => console.log(e),
  itemKey,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [selectedObjects, setSelectedObjects] = useState<(string | number)[]>(
    []
  );
  const [keyfield, setKeyfield] = useState<keyof object>(itemKey as keyof object);
  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);
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
  const getObjectByKeyfield = useCallback((key: string | number): object => {
    return data.find((item) => item[keyfield] === key) as object;
  }, [data, keyfield]);
  const renderColumnValue = useMemo(
    () => (key: string | number, column: Column) => {
      const value = (
        getObjectByKeyfield(key) as {
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
    },
    [getObjectByKeyfield]
  );
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
  const handleSelectRow = (key: string) => {
    const keyOfObject = getObjectByKeyfield(key)[keyfield];
    setSelectedObjects((prev) =>
      prev.includes(keyOfObject)
        ? prev.filter((i) => i !== keyOfObject)
        : [...prev, keyOfObject]
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
  const getRowIndex = (index: number): number => {
    return index + pageNumber * itemPerPage;
  };

  return (
    <table className="gridTable">
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
              isChecked={false}
              selectFunc={() => console.log("Select all")}
            />
          </td>
          {visibleColumns.map((column) => (
            <td key={column}>{column}</td>
          ))}
          <td></td>
        </tr>
        {filterData().map((obj, rowIndex) => (
          <tr key={obj[keyfield]}>
            <td>
              <TableCheckbox
                isChecked={selectedObjects.includes(obj[keyfield])}
                selectFunc={() => handleSelectRow(obj[keyfield])}
              />
            </td>
            {dataColumns.map((column) =>
              visibleColumns.includes(column.caption) ? (
                <td key={`${rowIndex}-${column.caption}`}>
                  {renderColumnValue(obj[keyfield], column)}
                </td>
              ) : null
            )}
            <td>
              <EditComponent
                data={data}
                index={getRowIndex(rowIndex)}
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
  );
};
{
  /* <div className="table">
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
              selectedObjects={selectedObjects}
              filterData={filterData}
              setSelectedObjects={setSelectedObjects}
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
            selectedCount={selectedObjects.length}
            selectedSize={selectedPageSize}
          />
        </div>
      </div> */
}

export default GridTable;
