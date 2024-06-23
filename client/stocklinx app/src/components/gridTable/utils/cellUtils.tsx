import {
  Column,
  LookupData,
  RenderCellProps,
} from "@/interfaces/gridTableInterfaces";
import { Checkbox } from "@mantine/core";
import React, { useMemo } from "react";
import EditComponent from "../edit/EditComponent";

export const GetLookupValue = (value: any, data?: LookupData[]) => {
  return data?.find((item: LookupData) => item.value === value)?.label || "";
};

export const RenderCell: React.FC<RenderCellProps> = React.memo(
  ({ obj, column }) => {
    const value = useMemo(
      () =>
        (
          obj as {
            [key: string | number]: any;
          }
        )[column.dataField],
      [obj, column.dataField]
    );

    const renderedValue = useMemo(() => {
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
    }, [column, value]);

    return renderedValue;
  }
);

interface RowCellsProps {
  obj: any;
  columns: Column[];
  keyfield: string;
  enableSelectActions: boolean;
  enableEditActions: boolean;
  selectedKeys: string[];
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
  enableSelectActions,
  enableEditActions,
  selectedKeys,
  handleSelectRow,
  onRowUpdate,
  onRowRemove,
}: RowCellsProps) => {
  return (
    <>
      {enableSelectActions && (
        <td className="gridtable__checkbox__cell">
          <Checkbox
            checked={selectedKeys.includes(obj[keyfield])}
            onChange={() => handleSelectRow(obj[keyfield])}
            radius={2}
            size="xs"
          />
        </td>
      )}
      {enableEditActions && (
        <td className="gridtable__edit__cell">
          <EditComponent
            obj={obj}
            id={obj[keyfield]}
            onRowUpdate={onRowUpdate}
            onRowRemove={onRowRemove}
          />
        </td>
      )}
      {columns.map((column) => (
        <td key={`$row__cell__${column.id}`} className="gridtable__row__cell">
          {column.renderComponent ? (
            column.renderComponent(obj)
          ) : (
            <RenderCell obj={obj} column={column} />
          )}
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
