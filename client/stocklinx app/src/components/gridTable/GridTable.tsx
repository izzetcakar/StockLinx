import React, { forwardRef, useImperativeHandle } from "react";
import { useGridTableContext } from "./context/GenericStateContext";
import { GridtableProps, GridtableRef } from "./interfaces/interfaces";
import GridTableContent from "./GridTableContent";

const GridTable: React.ForwardRefRenderFunction<
  GridtableRef,
  GridtableProps
> = (
  {
    data = [],
    columns = [],
    noDataText = "No Data Found",
    refreshData,
    onRowInsert = () => console.log("Row insert"),
    onRowUpdate = (row: object) => console.log(row),
    onRowRemove = (id: string) => console.log(id),
    onRowRemoveRange = (ids: string[]) => console.log(ids),
    itemKey,
    excelColumns,
    enableToolbar = false,
    enableExcelActions = false,
    enableEditActions = false,
    enableSelectActions = false,
  },
  ref
) => {
  const { selectedKeys } = useGridTableContext();

  useImperativeHandle(
    ref,
    () => ({
      selectedRowKeys: selectedKeys,
    }),
    [selectedKeys]
  );

  return (
    <GridTableContent
      data={data}
      columns={columns}
      noDataText={noDataText}
      refreshData={refreshData}
      onRowInsert={onRowInsert}
      onRowUpdate={onRowUpdate}
      onRowRemove={onRowRemove}
      onRowRemoveRange={onRowRemoveRange}
      itemKey={itemKey}
      excelColumns={excelColumns}
      enableToolbar={enableToolbar}
      enableExcelActions={enableExcelActions}
      enableEditActions={enableEditActions}
      enableSelectActions={enableSelectActions}
    />
  );
};

export default forwardRef(GridTable);
