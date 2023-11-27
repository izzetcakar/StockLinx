import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);
  const columns: Column[] = [
    {
      dataField: "companyId",
      caption: "Company",
      dataType: "action",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "locationId",
      caption: "Location",
      dataType: "string",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
  ];
  const excelColumns: ExcelColumn[] = [
    {
      caption: "Company",
      validate(value) {
        return value !== null;
      },
      errorText: "Company is required",
    },
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Location",
      nullable: true,
    },
  ];

  return { columns, excelColumns };
};
