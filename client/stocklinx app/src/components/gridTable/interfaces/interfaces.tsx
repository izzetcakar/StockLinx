export interface Column {
  dataField: string;
  caption: string;
  renderComponent?: (
    value: string | number | boolean | null | undefined
  ) => JSX.Element;
}
export interface IDropdownData {
  id: number;
  text: string;
}
