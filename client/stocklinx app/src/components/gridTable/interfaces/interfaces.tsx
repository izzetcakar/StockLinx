export interface Column {
  dataField: string;
  caption: string;
  renderComponent?: (
    value: any
  ) => JSX.Element | string | number | null | undefined;
  renderHeader?: () => React.ReactNode | string | number | null;
  lookup?: Lookup;
  dataType: "string" | "number" | "boolean" | "date" | "action";
  visible?: boolean;
}
export interface VisibleColumn {
  caption: string;
  dataField: string;
  renderHeader?: () => React.ReactNode | string | number | null;
}
export interface Lookup {
  dataSource: object[];
  valueExpr: string;
  displayExpr: string;
}
export interface IDropdownData {
  id: number;
  text: string;
}
export enum FilterType {
  TEXT = "text",
  NUMBER = "number",
  BOOLEAN = "boolean",
  LOOKUP = "lookup",
}
export interface Filter {
  field: string;
  type: FilterType;
  value: string | number | boolean | null;
  isApplied: boolean;
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
// export interface RowError {
//   row: number;
//   errors: ColumnError[];
// }
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
