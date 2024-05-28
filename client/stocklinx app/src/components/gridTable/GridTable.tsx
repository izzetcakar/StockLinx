import React, { forwardRef, useImperativeHandle } from "react";
import {
  GenericStateProvider,
  useGridTableContext,
} from "./context/GenericStateContext";
import { GridtableProps, GridtableRef } from "@interfaces/gridTableInterfaces";
import GridTableContent from "./GridTableContent";

const GridTable: React.ForwardRefRenderFunction<
  GridtableRef,
  GridtableProps
> = (
  {
    data,
    columns,
    noDataText,
    itemKey,
    excelColumns,
    enableToolbar,
    enableEditActions,
    enableSelectActions,
    pageSizes,
    onApplyFilters,
    refreshData,
    onRowInsert,
    onRowUpdate,
    onRowRemove,
    onRowRemoveRange,
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
        onApplyFilters={onApplyFilters}
      />
    </GenericStateProvider>
  );
};

export default forwardRef(GridTable);
