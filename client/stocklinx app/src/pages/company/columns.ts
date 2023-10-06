import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { ICompany } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];
  const devColumns: Column<ICompany>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "name",
      colSpan: 2,
    },
  ];

  return { columns, devColumns, formItems };
};
