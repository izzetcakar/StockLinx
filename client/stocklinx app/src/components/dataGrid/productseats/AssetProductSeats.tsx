import Gridtable from "@/components/gridTable/GridTable";
import { useAssetProduct } from "@/hooks/query/assetProduct";
import { assetSeatColumns } from "./AssetSeatColumns";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";

interface AssetSeatProps {
  field: string;
  value: string;
  productType?: "license" | "component";
  checkOut: (data: AssetProductCheckOutDto) => void;
}

const AssetProductSeats: React.FC<AssetSeatProps> = ({
  field,
  value,
  productType,
  checkOut,
}) => {
  const columns = assetSeatColumns(checkOut).columns;
  const { data: assetProducts } = useAssetProduct.GetAll();

  const filterByType = () => {
    switch (productType) {
      case "license":
        return assetProducts?.filter((u) => u.licenseId !== null) || [];
      case "component":
        return assetProducts?.filter((u) => u.componentId !== null) || [];
      default:
        return assetProducts || [];
    }
  };

  const getData = () => {
    return filterByType()?.filter((u) => u[field] === value);
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default AssetProductSeats;
