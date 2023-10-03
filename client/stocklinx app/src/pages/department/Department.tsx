import GridTable from "../../components/gridTable/GridTable";
import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
import { companyActions } from "../../redux/company/actions";
import { openDepartmentModal } from "../../modals/department/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { userActions } from "../../redux/user/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const onRowInsert = () => {
    openDepartmentModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as IDepartment;
    openDepartmentModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as IDepartment).id;
    genericConfirmModal(() => dispatch(departmentActions.remove({ id: id })));
  };

  const refreshData = () => {
    dispatch(departmentActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(userActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={departments}
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
      />
      <BaseDataGrid
        title="Department"
        data={departments}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Department;
