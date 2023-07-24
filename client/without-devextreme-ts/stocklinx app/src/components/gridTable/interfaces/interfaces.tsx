export interface Column {
    dataField: string;
    caption: string;
    dataType: string;
    renderComponent?: React.ComponentType<any>;
}
export interface IDropdownData {
    id: number;
    text: string;
}