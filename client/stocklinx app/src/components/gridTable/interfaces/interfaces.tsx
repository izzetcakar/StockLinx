export interface Column {
  dataField: string;
  caption: string;
  renderComponent?: (
    value: any
  ) => JSX.Element | string | number | null | undefined;
  lookup?: Lookup;
  dataType: string;
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