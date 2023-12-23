import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/Gridtable";
import { branchActions } from "../../redux/branch/actions";
import { departmentActions } from "../../redux/department/actions";
import { locationActions } from "../../redux/location/actions";
import { openDepartmentModal } from "../../modals/modals";

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const refreshData = () => {
    dispatch(departmentActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Departments</div>
      </div>
      <Gridtable
        data={departments}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(department) =>
          openDepartmentModal(department as IDepartment)
        }
        onRowInsert={() => openDepartmentModal()}
        onRowRemove={(id) => dispatch(departmentActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(departmentActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableExcelActions
        enableSelectActions
      />
    </>
  );
};

export default Department;
