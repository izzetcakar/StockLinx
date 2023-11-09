import React, { useState, useEffect, useCallback } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column, Filter, Lookup, VisibleColumn } from "./interfaces/interfaces";
import PageNumber from "./tableFooter/PageNumber";
import { Checkbox } from "@mantine/core";
import "./gridtable.scss";
import { useFilter } from "./functions/filter";

interface GridtableProps {
  itemKey: string;
  data: object[];
  columns: Column[];
  noDataText?: string;
  pageSizes?: number[];
  itemPerPage?: number;
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (id: string) => void;
}

const Gridtable: React.FC<GridtableProps> = ({
  data = [],
  columns = [],
  itemPerPage = 5,
  refreshData,
  onRowInsert = () => console.log("Row insert"),
  onRowUpdate = (row: object) => console.log(row),
  onRowRemove = (id: string) => console.log(id),
  itemKey,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [keyfield, setKeyfield] = useState<keyof object>(
    itemKey as keyof object
  );
  const { filters, getFilterInput, applyFilterToData, handleFilterAll } =
    useFilter(columns, data);

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);
  useEffect(() => {
    handleVisibleColumns();
    handleFilterAll();
  }, [data]);

  const addVisibleColumn = (columnCaption: string): void => {
    setVisibleColumns((prev) =>
      prev.includes(columnCaption)
        ? prev.filter((item) => item !== columnCaption)
        : [...prev, columnCaption]
    );
  };
  const filterData = useCallback(() => {
    const filteredData = applyFilterToData(data);
    if (pageNumber === 0) {
      return filteredData.slice(0, itemPerPage);
    }
    return filteredData.slice(
      pageNumber * itemPerPage,
      (pageNumber + 1) * itemPerPage
    );
  }, [data, itemPerPage, pageNumber, filters]);

  const getObjectByKeyfield = useCallback(
    (id: string | number): object => {
      return data.find((item) => item[keyfield] === id) as object;
    },
    [data, keyfield]
  );
  const getLookupValue = (value: any, lookup: Lookup) => {
    const lookupKey = lookup.valueExpr;
    const lookupDisplay = lookup.displayExpr;
    const item = lookup.dataSource.find(
      (item: { [key: string]: any }) => item[lookupKey] === value
    );

    return item
      ? ((item as { [key: string]: any })[lookupDisplay] as string)
      : " ";
  };
  const renderColumnValue = (id: string | number, column: Column) => {
    const value = (
      getObjectByKeyfield(id) as {
        [key: string | number]: string | number | boolean | null;
      }
    )[column.dataField];

    if (column.renderComponent) {
      return column.renderComponent(value);
    }
    if (column.lookup) {
      return getLookupValue(value, column.lookup);
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
  };
  const handleVisibleColumns = useCallback(() => {
    setVisibleColumns(
      columns.map((item) => {
        return {
          caption: item.caption,
          dataField: item.dataField,
          renderHeader: item.renderHeader,
        };
      })
    );
  }, [columns]);
  const handleSelectRow = (id: string | number) => {
    setSelectedKeys((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
  const getSelectedRowClass = (id: string | number): string => {
    return selectedKeys.includes(id)
      ? "gridtable__row__selected"
      : "gridtable__row__container";
  };
  const handleselectAll = () => {
    if (selectedKeys.length === data.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(data.map((item) => item[keyfield]));
    }
  };

  return (
    <table className="gridtable">
      <thead>
        <tr>
          <td colSpan={visibleColumns.length + 1}>
            <TableToolbar
              columns={columns}
              visibleColumns={visibleColumns}
              addVisibleColumn={addVisibleColumn}
              onRowInsert={onRowInsert}
              refreshData={refreshData}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="gridtable__column__container">
          <td className="gridtable__checkbox__cell">
            <Checkbox
              checked={selectedKeys.length === data.length}
              onChange={() => handleselectAll()}
              indeterminate={selectedKeys.length > 0}
              radius={2}
              size={18}
            />
          </td>
          {visibleColumns.map((column) => (
            <td
              key={"column__header__" + column.caption}
              className="gridtable__column__cell"
            >
              {column.renderHeader ? column.renderHeader() : column.caption}
            </td>
          ))}
          <td></td>
        </tr>
        <tr className="gridtable__filter__container">
          <td></td>
          {filters.map((filter: Filter) => (
            <td key={filter.field} className="gridtable__filter">
              {getFilterInput(filter)}
            </td>
          ))}
        </tr>
        {filterData().length > 0 ? (
          filterData().map((obj, rowIndex) => (
            <tr
              key={"gridtable__body__row__" + rowIndex}
              className={getSelectedRowClass(obj[keyfield])}
            >
              <td className="gridtable__checkbox__cell">
                <Checkbox
                  checked={selectedKeys.includes(obj[keyfield])}
                  onChange={() => handleSelectRow(obj[keyfield])}
                  radius={2}
                  size={18}
                />
              </td>
              {columns.map((column, index) =>
                visibleColumns
                  .map((x) => x.caption)
                  .includes(column.caption) ? (
                  <td
                    key={`gridtable__row__cell__${index}__${column.dataField}`}
                    className="gridtable__row__cell"
                  >
                    {renderColumnValue(obj[keyfield], column)}
                  </td>
                ) : null
              )}
              <td className="gridtable__edit">
                <EditComponent
                  obj={obj}
                  id={obj[keyfield]}
                  onRowUpdate={onRowUpdate}
                  onRowRemove={onRowRemove}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr className="gridtable__nodata__row">
            <td>No Data</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td className="table-footer" colSpan={visibleColumns.length + 1}>
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

export default Gridtable;
