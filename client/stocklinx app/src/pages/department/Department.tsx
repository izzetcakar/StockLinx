import { IDepartment } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openDepartmentModal } from "../../modals/department/modals";
import { branchActions } from "../../redux/branch/actions";
import { departmentActions } from "../../redux/department/actions";
import { locationActions } from "../../redux/location/actions";

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(departmentActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Departments</div>
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
