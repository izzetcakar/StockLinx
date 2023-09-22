import { Column } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
    },
  ];

  return columns;
};
