import { useEmployeeProduct } from "@queryhooks";
import { employeeSeatColumns } from "./EmployeeSeatColumns";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

interface EmployeeSeatProps {
  employeeId: string;
  productType?: "accessory" | "asset" | "consumable" | "license";
  checkOut: (data: EmployeeProductCheckOutDto) => void;
}

const EmployeeSeats: React.FC<EmployeeSeatProps> = ({
  employeeId,
  productType,
  checkOut,
}) => {
  const { columns, accessoryCell, assetCell, consumableCell, licenseCell } =
    employeeSeatColumns(checkOut);
  const {
    data: employeeProducts,
    isRefetching: employeeProductLoading,
    refetch: getEmployeeProductLK,
  } = useEmployeeProduct.GetAll();

  const filterById = () => {
    return employeeProducts?.filter((u) => u.employeeId === employeeId) || [];
  };

  const filterByProductType = () => {
    switch (productType) {
      case "accessory":
        return filterById().filter((u) => u.accessoryId !== null);
      case "asset":
        return filterById().filter((u) => u.assetId !== null);
      case "consumable":
        return filterById().filter((u) => u.consumableId !== null);
      case "license":
        return filterById().filter((u) => u.licenseId !== null);
      default:
        return filterById();
    }
  };

  const handleColumnsByProductType = () => {
    switch (productType) {
      case "accessory":
        columns.splice(2, 0, accessoryCell);
        return columns;
      case "asset":
        columns.splice(2, 0, assetCell);
        return columns;
      case "consumable":
        columns.splice(2, 0, consumableCell);
        return columns;
      case "license":
        columns.splice(2, 0, licenseCell);
        return columns;
      default:
        return columns;
    }
  };

  return (
    <BaseMantineTable
      data={filterByProductType()}
      columns={handleColumnsByProductType()}
      refetch={getEmployeeProductLK}
      isLoading={employeeProductLoading}
    />
  );
};

export default EmployeeSeats;
