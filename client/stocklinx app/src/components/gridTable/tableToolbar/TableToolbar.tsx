import React from "react";
import {
  Column,
  ExcelColumn,
  ImportedExcelData,
  RowError,
} from "../interfaces/interfaces";
import Dropdown from "./Dropdown";
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh from "../../.././assets/icon_refresh.png";
import icon_trash from "../../.././assets/icon_trash.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import uuid4 from "uuid4";
import ExcelJS from "exceljs";
import ExcelButton from "./ExcelButton";
import PaginationButtons from "../tableFooter/PaginationButtons";
import PerPageSelector from "../tableFooter/PerPageSelector";
import { utils, read } from "xlsx";
import { FileInput } from "@mantine/core";
import { openConfirmModal, openExcelModal } from "../modals/modals";
import { useVisibleColumns } from "../customhooks/visibleColumnsHook";
import "./tableToolbar.scss";
interface TableToolbarProps {
  data: object[];
  columns: Column[];
  excelColumns?: ExcelColumn[];
  enableExcelActions: boolean;
  handleItemPerPage: (value: number) => void;
  handlePageNumber: (value: boolean) => void;
  onRowInsert?: () => void;
  onRowRemoveRange: (ids: string[]) => void;
  refreshData?: () => Promise<void> | void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({
  data,
  columns,
  excelColumns,
  enableExcelActions,
  onRowInsert,
  onRowRemoveRange,
  refreshData,
  handleItemPerPage,
  handlePageNumber,
}) => {
  const { addVisibleColumn } = useVisibleColumns(columns);

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
  const exportToExcel = (isBaseSheet: boolean, excelData: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns =
      excelColumns?.map((x) => ({
        header: x.caption,
        key: x.caption,
      })) || [];

    !isBaseSheet &&
      (excelData as { [key: string]: any }[]).map((item) => {
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
    if (selectedKeys.length === 0) return;
    openConfirmModal(
      "Remove Range",
      "Are you sure want to remove selected items?",
      () => onRowRemoveRange(selectedKeys)
    );
  };
  const getSelectedData = () => {
    return (data as { [key: string]: any }[]).filter((x) =>
      selectedKeys.includes(x["id"])
    );
  };

  return (
    <div className="gridtable__toolbar">
      <Dropdown columns={columns} onChange={addVisibleColumn} />
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
      <ActionIconBtn
        submitFunc={() => removeRangeHandler()}
        icon={icon_trash}
        iconSize={16}
      />
      {enableExcelActions ? (
        <div className="gridtable__toolbar__last">
          <FileInput
            size="xs"
            accept=".xlsx"
            placeholder="Import Excel"
            onChange={handleFileInputChange}
            clearable
          />
          <ExcelButton
            onDownloadTemplate={() => exportToExcel(true, data)}
            onExportAll={() => exportToExcel(false, data)}
            onExportSelected={() => exportToExcel(false, getSelectedData())}
          />
          <PaginationButtons
            dataLength={data.length}
            handlePageNumber={handlePageNumber}
          />
          <PerPageSelector handleItemPerPage={handleItemPerPage} />
        </div>
      ) : null}
    </div>
  );
};

export default TableToolbar;
