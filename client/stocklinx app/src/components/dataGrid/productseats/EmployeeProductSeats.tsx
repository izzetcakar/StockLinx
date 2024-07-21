import { useEmployeeProduct } from "@queryhooks";
import { employeeSeatColumns } from "./EmployeeSeatColumns";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

interface EmployeeSeatProps {
  field: string;
  value: string;
  productType?: "license" | "asset" | "consumable" | "accessory";
  checkOut: (data: EmployeeProductCheckOutDto) => void;
}

const EmployeeProductSeats: React.FC<EmployeeSeatProps> = ({
  field,
  value,
  productType,
  checkOut,
}) => {
  const { columns, employeeCell } = employeeSeatColumns(checkOut);
  const {
    data: employeeProducts,
    isRefetching,
    refetch,
  } = useEmployeeProduct.GetAll();

  const filterByType = () => {
    switch (productType) {
      case "license":
        return employeeProducts?.filter((u) => u.licenseId !== null);
      case "asset":
        return employeeProducts?.filter((u) => u.assetId !== null);
      case "consumable":
        return employeeProducts?.filter((u) => u.consumableId !== null);
      case "accessory":
        return employeeProducts?.filter((u) => u.accessoryId !== null);
      default:
        return employeeProducts;
    }
  };

  const getData = () => {
    return filterByType()?.filter((u) => u[field] === value) || [];
  };

  const getColumns = () => {
    columns.splice(2, 0, employeeCell);
    return columns;
  };

  return (
    <BaseMantineTable
      data={getData()}
      columns={getColumns()}
      isLoading={isRefetching}
      refetch={refetch}
    />
  );
};

export default EmployeeProductSeats;
