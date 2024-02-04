export interface Column extends BaseColumn {
  id: string;
}
export interface BaseColumn {
  dataField: string;
  caption: string;
  renderComponent?: (e: object) => any;
  renderHeader?: () => React.ReactNode | string | number | null;
  lookup?: Lookup;
  dataType: "string" | "number" | "boolean" | "date" | "action";
  visible?: boolean;
  selectable?: boolean;
}
export interface Lookup {
  defaultData: object[];
  dataSource?: string;
  valueExpr: string;
  displayExpr: string;
}
export interface IDropdownData {
  id: number;
  text: string;
}
export enum FilterType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  LOOKUP = "LOOKUP",
}
export interface Filter {
  columnId: string;
  type: FilterType;
  value: string | number | boolean | null;
  isApplied: boolean;
  defaultData?: any[];
  dataSource?: string;
}
export interface QueryFilter {
  dataField: string;
  operator: string;
  value: string | number | boolean | null;
}
export interface ExcelColumn {
  caption: string;
  validate?: (value: any) => boolean;
  errorText?: string;
  nullable?: boolean;
}
export interface ImportedExcelData {
  id: string;
  caption: string;
  value: any;
}
export interface ColumnError {
  column: string;
  error: string;
}
export interface RowError {
  row: number;
  column: string;
  error: string;
}
export interface SelectedCell {
  rowIndex: number;
  columnIndex: number;
  column: string;
  value: any;
}
export interface GridtableProps {
  itemKey: string;
  data: object[];
  columns: BaseColumn[];
  noDataText?: string;
  pageSizes?: number[];
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (id: string) => void;
  onRowRemoveRange?: (ids: string[]) => void;
  onExpandData?: (skip: number, top: number) => void;
  onApplyFilter?: () => QueryFilter[];
  excelColumns?: ExcelColumn[];
  enableToolbar?: boolean;
  enableExcelActions?: boolean;
  enableEditActions?: boolean;
  enableSelectActions?: boolean;
  ref?: any;
}
export interface GridtableRef {
  selectedRowKeys: string[];
}
