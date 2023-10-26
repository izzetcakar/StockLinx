export interface Column {
  dataField: string;
  caption: string;
  renderComponent?: (
    value: any
  ) => JSX.Element | string | number | null | undefined;
}
export interface IDropdownData {
  id: number;
  text: string;
}
