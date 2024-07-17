import { useAssetProduct } from "@queryhooks";
import { useColumns } from "./LicenseSeatColumns";
import Gridtable from "@/components/gridTable/GridTable";

interface LicenseAssetSeatsProps {
  assetId: string;
}

const LicenseAssetSeats: React.FC<LicenseAssetSeatsProps> = ({ assetId }) => {
  const columns = useColumns().columns;
  const { data: assetProducts } = useAssetProduct.GetAll();

  const getData = () => {
    return (
      assetProducts?.filter(
        (ap) => ap.assetId === assetId && ap.licenseId !== null
      ) || []
    );
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default LicenseAssetSeats;
