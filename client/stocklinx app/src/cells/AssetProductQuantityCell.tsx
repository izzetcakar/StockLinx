import { useAssetProduct } from "@queryhooks";

interface AssetProductQuantityCellProps {
  productId: string;
  productType: string;
  totalQuantity: number;
}

const AssetProductQuantityCell: React.FC<AssetProductQuantityCellProps> = ({
  productId,
  productType,
  totalQuantity,
}) => {
  const { data: assetProducts } = useAssetProduct.GetAll();
  let checkedQuantity = 0;

  switch (productType) {
    case "Component":
      checkedQuantity =
        assetProducts
          ?.filter((assetProduct) => assetProduct.componentId === productId)
          .reduce((acc, curr) => acc + curr.quantity, 0) || 0;
      break;
    default:
      break;
  }

  return <div>{totalQuantity - checkedQuantity}</div>;
};

export default AssetProductQuantityCell;
