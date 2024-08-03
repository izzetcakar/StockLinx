import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { UseGridTableContext } from "./context/GenericStateContext";
import { GridtableProps, GridtableRef } from "@interfaces/gridTableInterfaces";
import GridTableContent from "./GridTableContent";
import { filterHooks } from "./hooks/filter";

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
    onRowDetail,
  },
  ref
) => {
  const { selectedKeys, filters } = UseGridTableContext();
  const { getQueryFilters } = filterHooks.useFilter();

  const queryFilters = useMemo(() => getQueryFilters(), [filters]);

  useImperativeHandle(
    ref,
    () => {
      return {
        selectedRowKeys: selectedKeys,
        queryFilters,
      };
    },
    [selectedKeys, queryFilters]
  );

  return (
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
      onRowDetail={onRowDetail}
    />
  );
};

const Gridtable = forwardRef(GridTable);
export default Gridtable;
