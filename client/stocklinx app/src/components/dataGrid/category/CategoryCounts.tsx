import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { productActions } from "../../../redux/product/actions";
import { useLayoutEffect } from "react";
import Gridtable from "../../gridTable/GridTableContent";

const CategoryCounts = () => {
  const dispatch = useDispatch();
  const productCategoryCounts = useSelector(
    (state: RootState) => state.product.productCategoryCounts
  );

  const refreshData = () => {
    dispatch(productActions.getProductCategoryCounts());
  };

  useLayoutEffect(() => {
    refreshData();
  }, []);

  return (
    <Gridtable
      data={productCategoryCounts}
      itemKey="categoryId"
      columns={useColumns()}
    />
  );
};

export default CategoryCounts;
