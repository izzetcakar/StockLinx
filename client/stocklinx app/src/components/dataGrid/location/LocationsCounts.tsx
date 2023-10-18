import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../../redux/location/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../generic/BaseDataGrid";
import "devextreme/data/odata/store";
import { RootState } from "../../../redux/rootReducer";
import React, { useEffect } from "react";

interface LocationCountsProps {
  className?: string;
  editing?: boolean;
}
const LocationCounts: React.FC<LocationCountsProps> = ({
  className,
  editing,
}) => {
  const dispatch = useDispatch();
  const counts = useSelector((state: RootState) => state.location.counts);

  const refreshData = () => {
    dispatch(locationActions.getCounts());
  };

  useEffect(() => {
    refreshData();
  }, []);
  return (
    <BaseDataGrid
      title="Product Locations"
      data={counts}
      className={className}
      editing={editing}
      keyExpr="locationId"
      columns={useColumns()}
      refreshData={refreshData}
    />
  );
};

export default LocationCounts;
