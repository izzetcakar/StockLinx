export interface Column {
  dataField: string;
  caption: string;
  renderComponent?: (
    value: any
  ) => JSX.Element | string | number | null | undefined;
  renderHeader?: () => React.ReactNode | string | number | null;
  lookup?: Lookup;
  dataType: "string" | "number" | "boolean" | "date" | "action";
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
