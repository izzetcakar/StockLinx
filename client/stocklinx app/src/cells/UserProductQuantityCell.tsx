import { useUserProduct } from "@/hooks/userProduct";

interface UserProductQuantityCellProps {
  productId: string;
  productType: string;
  totalQuantity: number;
}

const UserProductQuantityCell: React.FC<UserProductQuantityCellProps> = ({
  productId,
  productType,
  totalQuantity,
}) => {
  const { data: userProducts } = useUserProduct.GetAll();
  let checkedQuantity = 0;

  switch (productType) {
    case "Consumable":
      checkedQuantity =
        userProducts
          ?.filter((userProduct) => userProduct.consumableId === productId)
          .reduce((acc, curr) => acc + curr.quantity, 0) || 0;
      break;
    case "Accessory":
      checkedQuantity =
        userProducts
          ?.filter((userProduct) => userProduct.accessoryId === productId)
          .reduce((acc, curr) => acc + curr.quantity, 0) || 0;
      break;
    default:
      break;
  }

  return <div>{totalQuantity - checkedQuantity}</div>;
};

export default UserProductQuantityCell;
