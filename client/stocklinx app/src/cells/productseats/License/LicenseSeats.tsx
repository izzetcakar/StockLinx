import Gridtable from "@/components/gridTable/GridTable";
import { useAssetProduct } from "@/hooks/query/assetProduct";
import { useEmployeeProduct } from "@/hooks/query/employeeProduct";
import { ILicense } from "@/interfaces/serverInterfaces";
import { useColumns } from "./LicenseSeatColumns";

interface LicenseSeatsProps {
  license: ILicense;
}

const LicenseSeats: React.FC<LicenseSeatsProps> = ({ license }) => {
  const columns = useColumns().columns;
  const { data: employeeProducts } = useEmployeeProduct.GetAll();
  const { data: assetProducts } = useAssetProduct.GetAll();

  const getData = () => {
    const filteredEmployeeProducts =
      employeeProducts?.filter((u) => u.licenseId === license.id) || [];
    const filteredAssetProducts =
      assetProducts?.filter((a) => a.licenseId === license.id) || [];
    return [...filteredEmployeeProducts, ...filteredAssetProducts];
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default LicenseSeats;
