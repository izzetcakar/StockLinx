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
      dataType: "string",
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
      dataField: "companyId",
      validate(value) {
        return value !== null;
      },
      errorText: "Company is required",
    },
    {
      dataField: "name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      dataField: "locationId",
      nullable: true,
    },
  ];

  return { columns, excelColumns };
};
