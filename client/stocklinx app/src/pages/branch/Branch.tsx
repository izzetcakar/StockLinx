import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { branchActions } from "../../redux/branch/actions";
import { IBranch } from "../../interfaces/interfaces";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import { companyActions } from "../../redux/company/actions";

const Branch = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state: RootState) => state.branch.branches);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<IBranch>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Branch", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<IBranch>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Branch", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<IBranch>) => {
    datagridRequest(e, `Branch/${e.data.id}`, "delete");
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Branches</div>
      </div>
      <BaseDataGrid
        title="Branch"
        data={branches}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
        onRowInserting={onRowInserting}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        refreshData={refreshData}
        toolbarAddButton={true}
      />
    </>
  );
};

export default Branch;
