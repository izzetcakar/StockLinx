import { useAssetProduct } from "@queryhooks";
import { assetSeatColumns } from "./AssetSeatColumns";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

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
  const { columns, assetCell } = assetSeatColumns(checkOut);
  const {
    data: assetProducts,
    isRefetching: assetProductLoading,
    refetch: getAssetProductLK,
  } = useAssetProduct.GetAll();

  const filterByProductType = () => {
    switch (productType) {
      case "license":
        return assetProducts?.filter(
          (u) => u.licenseId !== null && u[field] === value
        );
      case "component":
        return assetProducts?.filter(
          (u) => u.componentId !== null && u[field] === value
        );
      default:
        return assetProducts;
    }
  };

  const getColumns = () => {
    columns.splice(2, 0, assetCell);
    return columns;
  };

  return (
    <BaseMantineTable
      data={filterByProductType()}
      columns={getColumns()}
      refetch={getAssetProductLK}
      isLoading={assetProductLoading}
    />
  );
};

export default AssetProductSeats;
