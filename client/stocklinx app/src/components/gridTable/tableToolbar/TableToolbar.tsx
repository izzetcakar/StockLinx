import React from "react";
import "./tableToolbar.scss";
import { Column } from "../interfaces/interfaces";
import Dropdown from "./Dropdown";
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh from "../../.././assets/icon_refresh.png";
import ActionIconBtn from "../../generic/ActionIconBtn";

interface TableToolbarProps {
  refreshData?: () => Promise<void> | void;
  filterData?: () => void;
  handleSearch?: () => void;
  columns: Column[];
  visibleColumns: string[];
  addVisibleColumn: (column: string) => void;
  onRowInsert?: () => void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({
  columns,
  visibleColumns,
  refreshData,
  addVisibleColumn,
  onRowInsert,
}) => {
  return (
    <div className="table-toolbar">
      <Dropdown
        columns={columns}
        onChange={addVisibleColumn}
        visibleColumns={visibleColumns}
      />
      {onRowInsert ? (
        <ActionIconBtn
          submitFunc={onRowInsert}
          icon={icon_plus}
          iconSize={16}
        />
      ) : null}
      {refreshData ? (
        <ActionIconBtn
          submitFunc={refreshData}
          icon={icon_refresh}
          iconSize={16}
        />
      ) : null}
    </div>
  );
};

export default TableToolbar;
