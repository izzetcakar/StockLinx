import { useEmployeeProduct } from "@/hooks/query/employeeProduct";

interface EmployeeProductQuantityCellProps {
  productId: string;
  productType: string;
  totalQuantity: number;
}

const EmployeeProductQuantityCell: React.FC<EmployeeProductQuantityCellProps> = ({
  productId,
  productType,
  totalQuantity,
}) => {
  const { data: employeeProducts } = useEmployeeProduct.GetAll();

  const getCheckedQuantity = () => {
    switch (productType) {
      case "Consumable":
        return (
          employeeProducts
            ?.filter((employeeProduct) => employeeProduct.consumableId === productId)
            .reduce((acc, curr) => acc + curr.quantity, 0) || 0
        );

      case "Accessory":
        return (
          employeeProducts
            ?.filter((employeeProduct) => employeeProduct.accessoryId === productId)
            .reduce((acc, curr) => acc + curr.quantity, 0) || 0
        );
      default:
        return 0;
    }
  };

  return <div>{totalQuantity - getCheckedQuantity()}</div>;
};

export default EmployeeProductQuantityCell;
