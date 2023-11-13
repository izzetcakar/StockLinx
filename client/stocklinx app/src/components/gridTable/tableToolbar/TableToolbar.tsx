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
import { IconDownload } from "@tabler/icons-react";
import { openExcelModal } from "../../../modals/category/modals";
import uuid4 from "uuid4";
import "./tableToolbar.scss";
interface TableToolbarProps {
  data: object[];
  columns: Column[];
  excelColumns?: ExcelColumn[];
  visibleColumns: VisibleColumn[];
  enableExcelActions: boolean;
  addVisibleColumn: (column: string) => void;
  onRowInsert?: () => void;
  refreshData?: () => Promise<void> | void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({
  data,
  columns,
  visibleColumns,
  excelColumns,
  enableExcelActions,
  addVisibleColumn,
  onRowInsert,
  refreshData,
}) => {
  // const [errors, setErrors] = useState<RowError[]>([]);
  // const [importedData, setImportedData] = useState<ImportedExcelData[]>([]);

  const handleFileInputChange = async (file: File | null) => {
    if (file) {
      const reader = new FileReader();

      const readFile = () => {
        return new Promise<{
          errors: RowError[];
          importedData: ImportedExcelData[];
        }>((resolve) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              const data = e.target.result;
              const workbook = read(data, { type: "binary" });
              const worksheet = workbook.Sheets[workbook.SheetNames[0]];
              const importedData: { [key: string]: any }[] =
                utils.sheet_to_json(worksheet);
              const newErrors: RowError[] = [];

              excelColumns?.forEach((excelColumn) => {
                importedData.forEach((row, rowIndex) => {
                  const column = excelColumn.dataField;
                  const columnData = columns.find(
                    (x) => x.dataField === column
                  );
                  if (row[column] === undefined) {
                    row[column] = null;
                  }
                  if (
                    excelColumn.validate &&
                    !excelColumn.validate(row[column])
                  ) {
                    handleError(
                      newErrors,
                      rowIndex,
                      column,
                      excelColumn.errorText || "Invalid validate value"
                    );
                  } else if (columnData?.lookup) {
                    const selectedLookup = (
                      columnData.lookup.dataSource as { [key: string]: any }[]
                    ).find((lookupData) => {
                      if (!columnData.lookup) {
                        return false;
                      }
                      if (
                        lookupData[columnData.lookup.displayExpr as string] ===
                        row[columnData.dataField]
                      ) {
                        row[column] =
                          lookupData[columnData.lookup.valueExpr as string];
                        return lookupData;
                      }
                    });
                    if (!selectedLookup) {
                      handleError(
                        newErrors,
                        rowIndex,
                        column,
                        "Invalid lookup value"
                      );
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

              resolve({
                errors: updatedErrors,
                importedData: (filteredImportedData as ImportedExcelData[]).map(
                  (row) => {
                    return {
                      ...row,
                      id: uuid4(),
                    };
                  }
                ),
              });
            }
          };

          reader.readAsArrayBuffer(file);
        });
      };

      const result = await readFile();
      console.log(result.errors);
      // setErrors(result.errors);
      // setImportedData(result.importedData);
      openExcelModal(result.importedData, columns);
    }
  };
  const handleError = (
    newErrors: RowError[],
    row: number,
    column: string,
    error: string
  ) => {
    const rowError = newErrors.find((x) => x.row === row);
    if (rowError) {
      const columnError = rowError.errors.find((x) => x.column === column);
      if (columnError) {
        columnError.error = error;
      } else {
        rowError.errors.push({ column, error });
      }
    } else {
      newErrors.push({ row, errors: [{ column, error }] });
    }
  };
  const exportToExcel = (isBaseSheet: boolean) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    worksheet.columns =
      excelColumns?.map((x) => ({
        header: x.dataField,
        key: x.dataField,
      })) || [];

    !isBaseSheet &&
      (data as { [key: string]: any }[]).map((item) => {
        let newRow = {} as { [key: string]: any };
        excelColumns?.map((excelColumn) => {
          const column = columns.find(
            (c) => c.dataField === excelColumn.dataField
          );
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
          newRow = { ...newRow, [excelColumn.dataField]: value };
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
      {enableExcelActions ? (
        <div className="table__toolbar__last">
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
