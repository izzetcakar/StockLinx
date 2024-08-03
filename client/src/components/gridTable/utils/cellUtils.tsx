import {
  Column,
  LookupData,
  RenderCellProps,
} from "@/interfaces/gridTableInterfaces";
import { Checkbox } from "@mantine/core";
import React from "react";
import EditComponent from "../edit/EditComponent";

export const GetLookupValue = (value: any, data?: LookupData[]) => {
  return data?.find((item: LookupData) => item.value === value)?.label || "";
};

export const RenderCell: React.FC<RenderCellProps> = ({
  obj,
  column,
  index,
}) => {
  const value = (
    obj as {
      [key: string | number]: any;
    }
  )[column.dataField];

  if (column.renderComponent) {
    return column.renderComponent(obj, index);
  }

  if (column.lookup?.data) {
    return GetLookupValue(value, column.lookup.data);
  }
  if (column.dataType === "boolean") {
    return value;
  }
  if (column.dataType === "date") {
    return new Date(value).toLocaleDateString();
  }
  return value;
};

interface RowCellsProps {
  obj: any;
  columns: Column[];
  keyfield: string;
  enableSelectActions: boolean;
  enableEditActions: boolean;
  selectedKeys: string[];
  rowIndex: number;
  handleSelectRow: (id: string) => void;
  onRowUpdate: (row: object) => void;
  onRowRemove: (id: string) => void;
}
interface RowProps extends RowCellsProps {
  getSelectedRowClass: (id: string) => any;
}

const RowCells = ({
  obj,
  columns,
  keyfield,
  rowIndex,
  enableSelectActions,
  enableEditActions,
  selectedKeys,
  handleSelectRow,
  onRowUpdate,
  onRowRemove,
}: RowCellsProps) => {
  return (
    <>
      {enableSelectActions ? (
        <td className="gridtable__checkbox__cell">
          <Checkbox
            checked={selectedKeys.includes(obj[keyfield])}
            onChange={() => handleSelectRow(obj[keyfield])}
            radius={2}
            size="xs"
          />
        </td>
      ) : null}
      {enableEditActions ? (
        <td className="gridtable__edit__cell">
          <EditComponent
            obj={obj}
            id={obj[keyfield]}
            onRowUpdate={onRowUpdate}
            onRowRemove={onRowRemove}
          />
        </td>
      ) : null}
      {columns.map((column) => (
        <td key={`$row__cell__${column.id}`} className="gridtable__row__cell">
          <RenderCell obj={obj} column={column} index={rowIndex} />
        </td>
      ))}
    </>
  );
};

export const MemoizedRow = React.memo(
  ({
    obj,
    columns,
    keyfield,
    rowIndex,
    enableSelectActions,
    enableEditActions,
    selectedKeys,
    handleSelectRow,
    getSelectedRowClass,
    onRowUpdate,
    onRowRemove,
  }: RowProps) => {
    return (
      <tr className={getSelectedRowClass(obj[keyfield])}>
        <RowCells
          obj={obj}
          columns={columns}
          keyfield={keyfield}
          rowIndex={rowIndex}
          enableSelectActions={enableSelectActions}
          enableEditActions={enableEditActions}
          selectedKeys={selectedKeys}
          handleSelectRow={handleSelectRow}
          onRowUpdate={onRowUpdate}
          onRowRemove={onRowRemove}
        />
      </tr>
    );
  }
);
