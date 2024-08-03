import { useAssetProduct } from "@queryhooks";
import { assetSeatColumns } from "./AssetSeatColumns";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import { assetProductRequests } from "@/server/requests";

interface AssetSeatProps {
  assetId: string;
  productType?: "license" | "component";
  checkOut: (data: AssetProductCheckOutDto) => void;
}

const AssetSeats: React.FC<AssetSeatProps> = ({
  assetId,
  productType,
  checkOut,
}) => {
  const { columns, licenseCell, componentCell } = assetSeatColumns(checkOut);
  const {
    data: assetProducts,
    isRefetching: assetProductLoading,
    refetch: getAssetProductLK,
  } = useAssetProduct.GetAll();

  const filterById = () => {
    return assetProducts?.filter((u) => u.assetId === assetId) || [];
  };

  const filterByProductType = () => {
    switch (productType) {
      case "license":
        return filterById().filter((u) => u.licenseId !== null);
      case "component":
        return filterById().filter((u) => u.componentId !== null);
      default:
        return filterById();
    }
  };

  const handleColumnsByProductType = () => {
    switch (productType) {
      case "license":
        columns.splice(2, 0, licenseCell);
        return columns;
      case "component":
        columns.splice(2, 0, componentCell);
        return columns;
      default:
        return columns;
    }
  };

  return (
    <BaseMantineTable
      data={filterByProductType()}
      columns={handleColumnsByProductType()}
      refetch={getAssetProductLK}
      isLoading={assetProductLoading}
      getExportData={(ids: string[]) => assetProductRequests.getDtos(ids)}
    />
  );
};

export default AssetSeats;
