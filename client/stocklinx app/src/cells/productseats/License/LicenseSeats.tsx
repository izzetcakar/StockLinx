import Gridtable from "@/components/gridTable/GridTable";
import { useAssetProduct } from "@/hooks/query/assetProduct";
import { useUserProduct } from "@/hooks/query/userProduct";
import { ILicense } from "@/interfaces/serverInterfaces";
import { useColumns } from "./LicenseSeatColumns";

interface LicenseSeatsProps {
  license: ILicense;
}

const LicenseSeats: React.FC<LicenseSeatsProps> = ({ license }) => {
  const columns = useColumns().columns;
  const { data: userProducts } = useUserProduct.GetAll();
  const { data: assetProducts } = useAssetProduct.GetAll();

  const getData = () => {
    const filteredUserProducts =
      userProducts?.filter((u) => u.licenseId === license.id) || [];
    const filteredAssetProducts =
      assetProducts?.filter((a) => a.licenseId === license.id) || [];
    return [...filteredUserProducts, ...filteredAssetProducts];
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default LicenseSeats;
