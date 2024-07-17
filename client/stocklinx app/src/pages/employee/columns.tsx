import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IEmployee } from "@interfaces/serverInterfaces";
import {
  useDepartment,
  useAccessory,
  useConsumable,
  useComponent,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import EmployeeForm from "@/forms/employee/EmployeeForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";
import AssetProductSeats from "@/components/dataGrid/productseats/AssetProductSeats";
import LicenseEmployeeSeats from "@/components/dataGrid/productseats/License/LicenseEmployeeSeats";

export const useColumns = () => {
  const { refetch: getDepartmentLK } = useDepartment.Lookup();
  const { mutate: checkOutAccessory } = useAccessory.CheckOut();
  const { mutate: checkOutConumable } = useConsumable.CheckOut();
  const { mutate: checkOutComponent } = useComponent.CheckOut();

  const columns: DataColumn[] = [
    {
      dataField: "departmentId",
      caption: "Department",
      dataType: "string",
      lookup: {
        dataSource: getDepartmentLK,
      },
      renderComponent: (e) =>
        EntityCells.Department((e as IEmployee).departmentId),
    },
    {
      dataField: "firstName",
      dataType: "string",
      caption: "First Name",
    },
    {
      dataField: "lastName",
      dataType: "string",
      caption: "Last Name",
    },
    {
      caption: "Title",
      dataField: "jobTitle",
      dataType: "string",
    },
    {
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
    {
      dataField: "phoneNo",
      caption: "Phone",
      dataType: "string",
    },
    {
      dataField: "startDate",
      caption: "Start Date",
      dataType: "date",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (employee: IEmployee) => {
        return (
          <div>
            Name : {employee.firstName} {employee.lastName}
          </div>
        );
      },
      renderData: (e) => <EmployeeForm employee={e as IEmployee} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
    {
      title: "Accessory",
      renderData: (e) => (
        <EmployeeProductSeats
          field="employeeId"
          value={(e as IEmployee).id}
          productType="accessory"
          checkOut={checkOutAccessory}
        />
      ),
    },
    {
      title: "Consumable",
      renderData: (e) => (
        <EmployeeProductSeats
          field="employeeId"
          value={(e as IEmployee).id}
          productType="consumable"
          checkOut={checkOutConumable}
        />
      ),
    },
    {
      title: "Component",
      renderData: (e) => (
        <AssetProductSeats
          field="employeeId"
          value={(e as IEmployee).id}
          productType="component"
          checkOut={checkOutComponent}
        />
      ),
    },
    {
      title: "License",
      renderData: (e) => (
        <LicenseEmployeeSeats employeeId={(e as IEmployee).id} />
      ),
    },
  ];

  return { columns, cardColumns };
};
