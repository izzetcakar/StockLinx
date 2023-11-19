import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { IBranch } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { openBranchModal } from "../../modals/branch/modals";
import { branchActions } from "../../redux/branch/actions";

const Branch = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state: RootState) => state.branch.branches);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Branches</div>
      </div>
      <Gridtable
        data={branches}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(branch) => openBranchModal(branch as IBranch)}
        onRowInsert={() => openBranchModal()}
        onRowRemove={(id) => dispatch(branchActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(branchActions.removeRange({ ids: ids }))
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

export default Branch;
