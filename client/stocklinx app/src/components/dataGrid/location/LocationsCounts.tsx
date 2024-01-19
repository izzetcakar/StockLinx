import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useLayoutEffect } from "react";
import { productActions } from "../../../redux/product/actions";
import Gridtable from "../../gridTable/GridTableContent";

const LocationCounts = () => {
  const dispatch = useDispatch();
  const productLocationCounts = useSelector(
    (state: RootState) => state.product.productLocationCounts
  );

  const refreshData = () => {
    dispatch(productActions.getProductLocationCounts());
  };

  useLayoutEffect(() => {
    refreshData();
  }, []);

  return (
    <Gridtable
      itemKey="locationId"
      data={productLocationCounts}
      columns={useColumns()}
    />
  );
};

export default LocationCounts;
