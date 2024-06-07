import React from "react";
import {
  ExcelColumn,
  ImportedExcelData,
  QueryFilter,
  RowError,
} from "@interfaces/gridTableInterfaces";
import icon_plus from "../../.././assets/icon_plus.png";
import icon_refresh from "../../.././assets/icon_refresh.png";
import icon_trash from "../../.././assets/icon_trash.png";
import icon_filter from "../../.././assets/icon_filter.png";
import ActionIconBtn from "../../generic/ActionIconBtn";
import uuid4 from "uuid4";
import ExcelJS from "exceljs";
import ExcelButton from "./ExcelButton";
import ItemNumberSelector from "../tableFooter/ItemNumberSelector";
import { utils, read } from "xlsx";
import { FileInput } from "@mantine/core";
import { openConfirmModal, openExcelModal } from "../modals/modals";
import { useGridTableContext } from "../context/GenericStateContext";
import "./tableToolbar.scss";
import Filters from "./Filters";
import DropDown from "./Dropdown";

interface TableToolbarProps {
  data: object[];
  excelColumns?: ExcelColumn[];
  itemKey: string;
  onRowRemoveRange: (ids: string[]) => void;
  applyFilters: (queryFilters: QueryFilter[]) => void;
  onRowInsert?: () => void;
  refreshData?: () => Promise<void> | void;
  onExpandData?: (skip: number, top: number) => void;
}
const TableToolbar: React.FC<TableToolbarProps> = ({
  data,
  excelColumns,
  itemKey,
  onRowRemoveRange,
  applyFilters,
  onRowInsert,
  refreshData,
  onExpandData,
}) => {
  const { gridColumns, selectedKeys, filters } = useGridTableContext();
  const [filtersVisible, setFiltersVisible] = React.useState(false);

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
                  const column = gridColumns.find(
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
                      column.lookup.data as { [key: string]: any }[]
                    ).find((lookupData) => {
                      if (!column.lookup) {
                        return false;
                      }
                      if (lookupData["label"] === row[columnCaption]) {
                        row[columnCaption] = lookupData["label"];
                        newData[rowIndex][columnData] = lookupData["label"];
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
        gridColumns.map((c) => ({ ...c, visible: true })),
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
          const column = gridColumns.find(
            (c) => c.caption === excelColumn.caption
          );
          if (!column) return;
          const dataField = column.dataField;
          let value = item[dataField];

          if (column?.lookup) {
            const selectedLookup = (
              column.lookup.data as { [key: string]: any }[]
            ).find((lookupData) => {
              if (lookupData["label"] === item[dataField]) {
                return lookupData;
              }
            });
            if (!selectedLookup) {
              return;
            }
            value = selectedLookup[dataField];
          } else {
            value = item[dataField];
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
      selectedKeys.includes(x[itemKey])
    );
  };

  return (
    <div className="gridtable__toolbar">
      <div className="gridtable__toolbar__actions">
        <DropDown />
        {
          <ActionIconBtn
            action={() => setFiltersVisible((prev) => !prev)}
            icon={icon_filter}
            iconSize={25}
          />
        }
        {onRowInsert ? (
          <ActionIconBtn action={onRowInsert} icon={icon_plus} iconSize={25} />
        ) : null}
        {refreshData ? (
          <ActionIconBtn
            action={refreshData}
            icon={icon_refresh}
            iconSize={25}
          />
        ) : null}
        <ActionIconBtn
          action={() => removeRangeHandler()}
          icon={icon_trash}
          iconSize={25}
        />
        {excelColumns ? (
          <div className="gridtable__toolbar__actions__last">
            <FileInput
              size="xs"
              accept=".xlsx"
              onChange={handleFileInputChange}
              placeholder="Import Excel"
              clearable
            />
            <ExcelButton
              onDownloadTemplate={() => exportToExcel(true, data)}
              onExportAll={() => exportToExcel(false, data)}
              onExportSelected={() => exportToExcel(false, getSelectedData())}
            />
            {onExpandData ? <ItemNumberSelector /> : null}
          </div>
        ) : null}
      </div>
      {filtersVisible ? (
        <Filters filters={filters} applyFilters={applyFilters} />
      ) : null}
    </div>
  );
};

export default TableToolbar;
