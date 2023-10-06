import { ILicense } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { licenseActions } from "../../redux/license/actions";
import { categoryActions } from "../../redux/category/actions";
import { locationActions } from "../../redux/location/actions";
import { companyActions } from "../../redux/company/actions";
import { supplierActions } from "../../redux/supplier/actions";
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

const License = () => {
  const dispatch = useDispatch();
  const licenses = useSelector((state: RootState) => state.license.licenses);
  const gridRef: React.LegacyRef<DataGrid<object>> = React.useRef(null);

  const refreshData = () => {
    dispatch(supplierActions.getAll());
    dispatch(licenseActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<ILicense>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Consumable", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<ILicense>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Consumable", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<ILicense>) => {
    datagridRequest(e, `Consumable/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Licenses</div>
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
        title="License"
        data={licenses}
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

export default License;
