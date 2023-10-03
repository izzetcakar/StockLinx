import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { ICategory } from "../../interfaces/interfaces";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];
  const devColumns: Column<ICategory>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];

  return { columns, devColumns };
};
