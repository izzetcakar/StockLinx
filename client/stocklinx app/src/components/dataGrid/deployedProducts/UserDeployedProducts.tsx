import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useEffect } from "react";
import Gridtable from "../../gridTable/GridTable";
import { deployedProductActions } from "../../../redux/deployedProduct/actions";

interface UserDeployedProductsProps {
  userId: string;
}
const UserDeployedProducts: React.FC<UserDeployedProductsProps> = ({
  userId,
}) => {
  const dispatch = useDispatch();
  const deployedProducts = useSelector(
    (state: RootState) => state.deployedProduct.deployedProducts
  );

  const refreshData = () => {
    dispatch(deployedProductActions.getAll());
  };

  useEffect(() => {
    refreshData();
  }, [userId]);

  return (
    <Gridtable
      itemKey="id"
      data={deployedProducts.filter((dp) => dp.userId === userId)}
      columns={useColumns()}
    />
  );
};

export default UserDeployedProducts;
