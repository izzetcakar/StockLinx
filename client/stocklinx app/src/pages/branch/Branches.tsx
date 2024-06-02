import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { IBranch } from "@interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { branchActions } from "../../redux/branch/actions";
import { openBranchModal } from "../../modals/modals";
import { locationActions } from "../../redux/location/actions";

const Branch = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state: RootState) => state.branch.branches);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(locationActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Branches</div>
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
        onApplyFilters={(filters) => dispatch(branchActions.filter(filters))}
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Branch;
