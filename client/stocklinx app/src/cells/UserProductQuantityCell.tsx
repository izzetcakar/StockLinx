import { useUserProduct } from "@/hooks/query/userProduct";

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

  const getCheckedQuantity = () => {
    switch (productType) {
      case "Consumable":
        return (
          userProducts
            ?.filter((userProduct) => userProduct.consumableId === productId)
            .reduce((acc, curr) => acc + curr.quantity, 0) || 0
        );

      case "Accessory":
        return (
          userProducts
            ?.filter((userProduct) => userProduct.accessoryId === productId)
            .reduce((acc, curr) => acc + curr.quantity, 0) || 0
        );
      default:
        return 0;
    }
  };

  return <div>{totalQuantity - getCheckedQuantity()}</div>;
};

export default UserProductQuantityCell;
