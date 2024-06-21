export interface Column extends DataColumn {
  id: string;
}
export enum DataType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  ACTION = "action",
}
export interface DataColumn {
  dataField: string;
  caption: string;
  renderComponent?: (e: object) => any;
  renderHeader?: () => any;
  lookup?: Lookup;
  dataType: "string" | "number" | "boolean" | "date" | "action";
  allowVisible?: boolean;
  allowFiltering?: boolean;
}
export interface LookupData {
  value: any;
  label: string;
}
export interface Lookup {
  data?: LookupData[];
  dataSource?: () => Promise<any> | any;
}

export enum FilterType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  LOOKUP = "LOOKUP",
}

export enum Operator {
  CONTAINS = "contains",
  STARTSWITH = "startswith",
  ENDSWITH = "endswith",
  EQUALS = "equals",
  NOTEQUALS = "notequals",
  GREATERTHANOREQUAL = "greaterthanorequal",
  LESSTHANOREQUAL = "lessthanorequal",
  GREATERTHAN = "greaterthan",
  LESSTHAN = "lessthan",
}
export interface Filter {
  columnId: string;
  type: FilterType;
  value: string | null;
}
export interface AppliedFilter {
  dataField: string;
  value: string;
}
export interface QueryFilter {
  dataField: string;
  operator: Operator;
  value: string | number | boolean;
}
export interface ExcelColumn {
  caption: string;
  errorText?: string;
  nullable?: boolean;
  validate?: (value: any) => boolean;
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
export interface GridtableProps {
  itemKey: string;
  data: object[];
  columns: DataColumn[];
  noDataText?: string;
  pageSizes?: number[];
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (id: string) => void;
  onRowRemoveRange?: (ids: string[]) => void;
  onExpandData?: (skip: number, top: number) => void;
  onApplyFilters?: (filters: QueryFilter[]) => void;
  onRowDetail?: (row: object) => void;
  excelColumns?: ExcelColumn[];
  enableToolbar?: boolean;
  enableEditActions?: boolean;
  enableSelectActions?: boolean;
  ref?: any;
}
export interface GridtableRef {
  selectedRowKeys: string[];
  queryFilters: QueryFilter[];
}
export interface RenderCellProps {
  obj: object;
  column: Column;
}