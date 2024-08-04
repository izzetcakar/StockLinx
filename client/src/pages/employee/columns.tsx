import { IEmployee } from "@interfaces/serverInterfaces";
import {
  useDepartment,
  useAccessory,
  useConsumable,
  useLicense,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import { formatDate } from "@/utils/dateUtils";
import EmployeeForm from "@/forms/employee/EmployeeForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeSeats from "@/components/dataGrid/productseats/EmployeeSeats";
import EmployeeAssetSeats from "@/components/dataGrid/productseats/EmployeeAssetSeats";
import SubmissionSeats from "@/components/dataGrid/submission/SubmissionSeats";

export const useColumns = () => {
  const {
    data: departmentLK,
    isRefetching: departmentLoading,
    refetch: getDepartmentLK,
  } = useDepartment.Lookup();
  const { mutate: checkOutAccessory } = useAccessory.CheckOut();
  const { mutate: checkOutConsumable } = useConsumable.CheckOut();
  const { mutate: checkOutLicense } = useLicense.EmployeeCheckOut();

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
      filterVariant: "date-range",
      accessorFn: (originalRow) =>
        originalRow.startDate ? new Date(originalRow.startDate) : "",
      Cell: ({ row }) => formatDate(row.original.startDate),
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
        <EmployeeSeats
          employeeId={e.id}
          productType="accessory"
          checkOut={checkOutAccessory}
        />
      ),
    },
    {
      title: "Consumable",
      renderData: (e) => (
        <EmployeeSeats
          employeeId={e.id}
          productType="consumable"
          checkOut={checkOutConsumable}
        />
      ),
    },
    {
      title: "Asset",
      renderData: (e) => <EmployeeAssetSeats field="employeeId" value={e.id} />,
    },
    {
      title: "License",
      renderData: (e) => (
        <EmployeeSeats
          employeeId={e.id}
          productType="license"
          checkOut={checkOutLicense}
        />
      ),
    },
    {
      title: "Submissions",
      renderData: (e) => <SubmissionSeats employeeId={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
