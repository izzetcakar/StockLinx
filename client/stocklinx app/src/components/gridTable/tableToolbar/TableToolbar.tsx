import React from "react";
import "./tableToolbar.scss";
import { Column, VisibleColumn } from "../interfaces/interfaces";
import Dropdown from "./Dropdown";
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh from "../../.././assets/icon_refresh.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import icon_excel from "../../.././assets/icon_excel.png";
import { utils, read } from "xlsx";
import ExcelJS from "exceljs";

interface TableToolbarProps {
  refreshData?: () => Promise<void> | void;
  filterData?: () => void;
  handleSearch?: () => void;
  columns: Column[];
  visibleColumns: VisibleColumn[];
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
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const data = e.target.result;
          const workbook = read(data, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const importedData = utils.sheet_to_json(worksheet);

          console.log(importedData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const exportToExcel = () => {
    const data = [
      { name: "Item 1", type: "Type A" },
      { name: "Item 2", type: "Type B" },
    ];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Type", key: "type" },
    ];

    // // Add data rows
    // data.forEach((item) => {
    //   worksheet.addRow(item);
    // });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export-data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="table__toolbar">
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
      <div className="table__toolbar__last">
        <ActionIconBtn
          submitFunc={() => exportToExcel()}
          icon={icon_excel}
          iconSize={16}
        />
      </div>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="import-excel-label">
        Import Excel
      </label>
    </div>
  );
};

export default TableToolbar;
