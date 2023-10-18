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
    // ADD IMAGE
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "email",
      caption: "Email",
    },
  ];
  const formItems: IFormItem[] = [
    {
      dataField: "name",
    },
    {
      dataField: "email",
    },
  ];

  return { columns, devColumns, formItems };
};
