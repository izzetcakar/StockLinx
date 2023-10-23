import { IAccessory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { accessoryActions } from "../../redux/accessory/actions";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { supplierActions } from "../../redux/supplier/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import Button from "devextreme-react/button";
import DataGrid from "devextreme-react/data-grid";
import React from "react";
import { branchActions } from "../../redux/branch/actions";

const Accessory = () => {
  const dispatch = useDispatch();
  const accessories = useSelector(
    (state: RootState) => state.accessory.accessories
  );
  const gridRef: React.LegacyRef<DataGrid<object>> = React.useRef(null);

  const refreshData = () => {
    dispatch(accessoryActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(supplierActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IAccessory>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Accessory", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IAccessory>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Accessory", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IAccessory>) => {
    datagridRequest(e, `Accessory/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Accessories</div>
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
        title="Accessory"
        data={accessories}
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

export default Accessory;
