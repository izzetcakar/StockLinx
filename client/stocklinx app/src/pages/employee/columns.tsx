import { IEmployee } from "@interfaces/serverInterfaces";
import {
  useDepartment,
  useAccessory,
  useConsumable,
  useComponent,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import EmployeeForm from "@/forms/employee/EmployeeForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";
import AssetProductSeats from "@/components/dataGrid/productseats/AssetProductSeats";
import LicenseEmployeeSeats from "@/components/dataGrid/productseats/License/LicenseEmployeeSeats";

export const useColumns = () => {
  const {
    data: departmentLK,
    isRefetching: departmentLoading,
    refetch: getDepartmentLK,
  } = useDepartment.Lookup();
  const { mutate: checkOutAccessory } = useAccessory.CheckOut();
  const { mutate: checkOutConumable } = useConsumable.CheckOut();
  const { mutate: checkOutComponent } = useComponent.CheckOut();

  const columns: MRT_ColumnDef<IEmployee>[] = [
    {
      accessorKey: "departmentId",
      header: "Department",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Department(row.original.departmentId),
      mantineFilterMultiSelectProps: () => ({
        data: departmentLoading ? [] : departmentLK,
        rightSection: departmentLoading ? null : <Loader size={16} />,
        onDropdownOpen: getDepartmentLK,
      }),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "jobTitle",
      header: "Title",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNo",
      header: "Phone",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
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
