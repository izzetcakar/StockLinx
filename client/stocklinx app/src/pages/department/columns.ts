import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
  const users = useSelector((state: RootState) => state.user.users);

  const columns: Column[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      dataType: "string",
      lookup: {
        dataSource: branches,
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
    {
      dataField: "managerId",
      caption: "Manager",
      dataType: "string",
      lookup: {
        dataSource: users,
        valueExpr: "id",
        displayExpr: "firstName",
      },
    },
    // INVISIBLE COLUMNS
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
      visible: false,
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      dataField: "branchId",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
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
    {
      dataField: "managerId",
      nullable: true,
    },
    {
      dataField: "notes",
    },
  ];

  return { columns, excelColumns };
};
