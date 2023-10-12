import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../generic/BaseDataGrid";
import "devextreme/data/odata/store";
import { RootState } from "../../redux/rootReducer";

const ProductLocation = () => {
  const dispatch = useDispatch();
  const counts = useSelector((state: RootState) => state.location.counts);

  const refreshData = () => {
    dispatch(locationActions.getCounts());
  };

  return (
    <BaseDataGrid
      title="Asset"
      data={counts}
      keyExpr="locationId"
      columns={useColumns()}
      refreshData={refreshData}
    />
  );
};

export default ProductLocation;
