import { useEmployeeProduct } from "@/hooks/query/employeeProduct";
import { useColumns } from "./LicenseSeatColumns";
import Gridtable from "@/components/gridTable/GridTable";

interface LicenseEmployeeSeatsProps {
  employeeId: string;
}

const LicenseEmployeeSeats: React.FC<LicenseEmployeeSeatsProps> = ({
  employeeId,
}) => {
  const columns = useColumns().columns;
  const { data: employeeProducts } = useEmployeeProduct.GetAll();

  const getData = () => {
    return (
      employeeProducts?.filter(
        (ep) => ep.employeeId === employeeId && ep.licenseId !== null
      ) || []
    );
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default LicenseEmployeeSeats;
