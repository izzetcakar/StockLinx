import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useLayoutEffect } from "react";
import { productActions } from "../../../redux/product/actions";
import Gridtable from "../../gridTable/GridTable";
import { userActions } from "../../../redux/user/actions";

const CustomLogs = () => {
  const dispatch = useDispatch();
  const customLogs = useSelector(
    (state: RootState) => state.product.customLogs
  );

  const refreshData = () => {
    dispatch(productActions.getCustomLogs());
    dispatch(userActions.getAll());
  };

  useLayoutEffect(() => {
    refreshData();
  }, []);

  return <Gridtable itemKey="id" data={customLogs} columns={useColumns()} />;
};

export default CustomLogs;
