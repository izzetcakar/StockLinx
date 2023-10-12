import { IAsset } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { assetActions } from "../../redux/asset/actions";
import { useDispatch } from "react-redux";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { companyActions } from "../../redux/company/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { modelActions } from "../../redux/model/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import React from "react";
import DataGrid from "devextreme-react/data-grid";
import Button from "devextreme-react/button";

const Asset = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.asset.assets);
  const gridRef: React.LegacyRef<DataGrid<object>> = React.useRef(null);

  const refreshData = () => {
    dispatch(assetActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(companyActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IAsset>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Asset", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IAsset>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Asset", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IAsset>) => {
    datagridRequest(e, `Asset/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Assets</div>
        <Button
          onClick={() => {
            gridRef.current?.instance.addRow();
            gridRef.current?.instance.deselectAll();
          }}
          icon="plus"
          width={"fit-content"}
          text="Create New"
          type="default"
        />
      </div>
      <BaseDataGrid
        title="Asset"
        data={assets}
        gridRef={gridRef}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
      />
    </>
  );
};

export default Asset;
