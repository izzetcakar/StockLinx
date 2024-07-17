import Gridtable from "@/components/gridTable/GridTable";
import { useEmployeeProduct } from "@queryhooks";
import { employeeSeatColumns } from "./EmployeeSeatColumns";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";

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
  const columns = employeeSeatColumns(checkOut).columns;
  const { data: employeeProducts } = useEmployeeProduct.GetAll();

  const filterByType = () => {
    switch (productType) {
      case "license":
        return employeeProducts?.filter((u) => u.licenseId !== null) || [];
      case "asset":
        return employeeProducts?.filter((u) => u.assetId !== null) || [];
      case "consumable":
        return employeeProducts?.filter((u) => u.consumableId !== null) || [];
      case "accessory":
        return employeeProducts?.filter((u) => u.accessoryId !== null) || [];
      default:
        return employeeProducts || [];
    }
  };

  const getData = () => {
    return filterByType()?.filter((u) => u[field] === value);
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default EmployeeProductSeats;
