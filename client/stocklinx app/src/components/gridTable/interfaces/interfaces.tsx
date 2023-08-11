export interface Column {
    dataField: string;
    caption: string;
    dataType: string;
    renderComponent?: (value: any) => JSX.Element;
}
export interface IDropdownData {
    id: number;
    text: string;
}