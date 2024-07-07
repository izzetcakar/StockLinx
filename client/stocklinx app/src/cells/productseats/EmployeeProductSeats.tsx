import Gridtable from "@/components/gridTable/GridTable";
import { useEmployeeProduct } from "@/hooks/query/employeeProduct";
import { employeeSeatColumns } from "./EmployeeSeatColumns";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";

interface EmployeeSeatProps {
  productIdField: string;
  productId: string;
  checkOut: (data: EmployeeProductCheckOutDto) => void;
}

const EmployeeProductSeats: React.FC<EmployeeSeatProps> = ({
  productIdField,
  productId,
  checkOut,
}) => {
  const columns = employeeSeatColumns(checkOut).columns;
  const { data: employeeProducts } = useEmployeeProduct.GetAll();

  const getData = () => {
    return (
      employeeProducts?.filter((u) => u[productIdField] === productId) || []
    );
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default EmployeeProductSeats;
