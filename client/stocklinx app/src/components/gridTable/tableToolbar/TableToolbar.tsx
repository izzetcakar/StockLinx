import React from "react";
import {
  Column,
  ExcelColumn,
  ImportedExcelData,
  RowError,
  VisibleColumn,
} from "../interfaces/interfaces";
import Dropdown from "./Dropdown";
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh from "../../.././assets/icon_refresh.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import icon_excel from "../../.././assets/icon_excel.png";
import { utils, read } from "xlsx";
import ExcelJS from "exceljs";
import { Button, FileInput } from "@mantine/core";
import { IconDownload, IconTrashFilled } from "@tabler/icons-react";
import { openConfirmModal, openExcelModal } from "../modals/modals";
import uuid4 from "uuid4";
import "./tableToolbar.scss";
interface TableToolbarProps {
  data: object[];
  columns: Column[];
  excelColumns?: ExcelColumn[];
  visibleColumns: VisibleColumn[];
  enableExcelActions: boolean;
  selectedKeys: string[];
  addVisibleColumn: (column: string) => void;
  onRowInsert?: () => void;
  onRowRemoveRange: (ids: string[]) => void;
  refreshData?: () => Promise<void> | void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({
  data,
  columns,
  visibleColumns,
  excelColumns,
  enableExcelActions,
  selectedKeys,
  addVisibleColumn,
  onRowInsert,
  onRowRemoveRange,
  refreshData,
}) => {
  const handleFileInputChange = async (file: File | null) => {
    if (file) {
      const reader = new FileReader();

      const readFile = () => {
        return new Promise<{
          errors: RowError[];
          importedData: ImportedExcelData[];
          test: ImportedExcelData[];
        }>((resolve) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              const data = e.target.result;
              const workbook = read(data, { type: "binary" });
              const worksheet = workbook.Sheets[workbook.SheetNames[0]];
              const importedData: { [key: string]: any }[] =
                utils.sheet_to_json(worksheet);
              const newErrors: RowError[] = [];
              const newData: { [key: string]: any }[] = [...importedData];

              excelColumns?.forEach((excelColumn) => {
                importedData.forEach((row, rowIndex) => {
                  const column = columns.find(
                    (x) => x.caption === excelColumn.caption
                  );
                  if (!column) return;
                  const columnCaption = column.caption;
                  const columnData = column.dataField;
                  newData[rowIndex][columnData] = row[columnCaption];
                  if (row[columnCaption] === undefined) {
                    row[columnCaption] = null;
                    newData[rowIndex][columnData] = null;
                  }
                  if (row[columnCaption] == null && excelColumn.nullable)
                    return;
                  if (
                    excelColumn.validate &&
                    !excelColumn.validate(row[columnCaption])
                  ) {
                    newErrors.push({
                      row: rowIndex,
                      column: columnCaption,
                      error: excelColumn.errorText || "Invalid validate value",
                    });
                  } else if (column?.lookup) {
                    const selectedLookup = (
                      column.lookup.dataSource as { [key: string]: any }[]
                    ).find((lookupData) => {
                      if (!column.lookup) {
                        return false;
                      }
                      if (
                        lookupData[column.lookup.displayExpr as string] ===
                        row[columnCaption]
                      ) {
                        row[columnCaption] =
                          lookupData[column.lookup.valueExpr as string];
                        newData[rowIndex][columnData] =
                          lookupData[column.lookup.valueExpr as string];
                        return lookupData;
                      }
                    });
                    if (!selectedLookup) {
                      newErrors.push({
                        row: rowIndex,
                        column: columnCaption,
                        error: "Invalid lookup value",
                      });
                    }
                  }
                });
              });
              const updatedErrors = newErrors.sort((a, b) => a.row - b.row);
              const filteredImportedData = importedData.filter((row, index) => {
                if (!updatedErrors.some((err) => err.row === index)) {
                  return { datafield: row.datafield, value: row.value };
                }
              });
              const filteredNewData = newData.filter((row, index) => {
                if (!updatedErrors.some((err) => err.row === index)) {
                  return { datafield: row.datafield, value: row.value };
                }
              });

              resolve({
                errors: updatedErrors.map((err) => {
                  return {
                    ...err,
                    row: err.row + 2,
                  };
                }),
                importedData: (filteredImportedData as ImportedExcelData[]).map(
                  (row) => {
                    return {
                      ...row,
                      id: uuid4(),
                    };
                  }
                ),
                test: (filteredNewData as ImportedExcelData[]).map((row) => {
                  return {
                    ...row,
                    id: uuid4(),
                  };
                }),
              });
            }
          };

          reader.readAsArrayBuffer(file);
        });
      };
      const result = await readFile();
      openExcelModal(
        result.test,
        columns.map((c) => ({ ...c, visible: true })),
        result.errors
      );
    }
  };
  const exportToExcel = (isBaseSheet: boolean) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns =
      excelColumns?.map((x) => ({
        header: x.caption,
        key: x.caption,
      })) || [];

    !isBaseSheet &&
      (data as { [key: string]: any }[]).map((item) => {
        let newRow = {} as { [key: string]: any };
        excelColumns?.map((excelColumn) => {
          const column = columns.find((c) => c.caption === excelColumn.caption);
          let datafield = column?.dataField as string;
          let value = item[datafield as string];

          if (column?.lookup) {
            const selectedLookup = (
              column.lookup.dataSource as { [key: string]: any }[]
            ).find((lookupData) => {
              if (!column.lookup) {
                return false;
              }
              if (
                lookupData[column.lookup.valueExpr as string] ===
                item[column.dataField]
              ) {
                return lookupData;
              }
            });
            if (!selectedLookup) {
              return;
            }
            datafield = column.lookup.displayExpr;
            value = selectedLookup[datafield as string];
          } else {
            if (!column) return;
            value = item[datafield as string];
          }
          newRow = { ...newRow, [excelColumn.caption]: value };
        });
        worksheet.addRow(newRow);
      });

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
  const removeRangeHandler = () => {
    openConfirmModal("Remove Range", "Are you sure?", () =>
      onRowRemoveRange(selectedKeys)
    );
  };

  return (
    <div className="gridtable__toolbar">
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
      <Button
        leftIcon={<IconTrashFilled size={16} />}
        variant="default"
        onClick={() => removeRangeHandler()}
      >
        Remove Selected Rows
      </Button>
      {enableExcelActions ? (
        <div className="gridtable__toolbar__last">
          <FileInput
            accept=".xlsx"
            placeholder="Import Excel"
            onChange={handleFileInputChange}
            clearable
          />
          <Button
            px="xs"
            rightIcon={<IconDownload size={14} />}
            onClick={() => exportToExcel(true)}
            variant="default"
          >
            Base Excel Sheet
          </Button>
          <ActionIconBtn
            submitFunc={() => exportToExcel(false)}
            icon={icon_excel}
            iconSize={16}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TableToolbar;
