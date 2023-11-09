import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
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
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openDepartmentModal } from "../../modals/department/modals";
import { locationActions } from "../../redux/location/actions";

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );
  const gridRef: React.LegacyRef<DataGrid<object>> = React.useRef(null);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(departmentActions.getAll());
    dispatch(locationActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IDepartment>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Department", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IDepartment>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Department", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IDepartment>) => {
    datagridRequest(e, `Department/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Departments</div>
      </div>
      <BaseDataGrid
        title="Department"
        data={departments}
        gridRef={gridRef}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
      />
      <div style={{ padding: "1rem 0" }} />
      <Gridtable
        data={departments}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(department) =>
          openDepartmentModal(department as IDepartment)
        }
        onRowInsert={() => openDepartmentModal()}
      />
    </>
  );
};

export default Department;
