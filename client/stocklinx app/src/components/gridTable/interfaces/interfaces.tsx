export interface Column {
    dataField: string;
    caption: string;
    renderComponent?: (value: any) => JSX.Element;
}
export interface IDropdownData {
    id: number;
    text: string;
}