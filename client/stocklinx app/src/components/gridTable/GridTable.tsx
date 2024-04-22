import React, { forwardRef, useImperativeHandle } from "react";
import {
  GenericStateProvider,
  useGridTableContext,
} from "./context/GenericStateContext";
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
    itemKey,
    excelColumns,
    enableToolbar = false,
    enableEditActions = false,
    enableSelectActions = false,
    pageSizes = [],
    onApplyFilter,
    refreshData,
    onRowInsert = () => console.log("Row insert"),
    onRowUpdate = (row: object) => console.log(row),
    onRowRemove = (id: string) => console.log(id),
    onRowRemoveRange = (ids: string[]) => console.log(ids),
    onExpandData,
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
    <GenericStateProvider>
      <GridTableContent
        data={data}
        columns={columns}
        itemKey={itemKey}
        excelColumns={excelColumns}
        enableToolbar={enableToolbar}
        enableEditActions={enableEditActions}
        enableSelectActions={enableSelectActions}
        pageSizes={pageSizes}
        noDataText={noDataText}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        onRowRemoveRange={onRowRemoveRange}
        onExpandData={onExpandData}
        onApplyFilter={onApplyFilter}
      />
    </GenericStateProvider>
  );
};

export default forwardRef(GridTable);
