import Gridtable from "@/components/gridTable/GridTable";
import { useAssetProduct } from "@/hooks/query/assetProduct";
import { assetSeatColumns } from "./AssetSeatColumns";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";

interface AssetSeatProps {
  productIdField: string;
  productId: string;
  checkOut: (data: AssetProductCheckOutDto) => void;
}

const AssetProductSeats: React.FC<AssetSeatProps> = ({
  productIdField,
  productId,
  checkOut,
}) => {
  const columns = assetSeatColumns(checkOut).columns;
  const { data: assetProducts } = useAssetProduct.GetAll();

  const getData = () => {
    return assetProducts?.filter((u) => u[productIdField] === productId) || [];
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default AssetProductSeats;
