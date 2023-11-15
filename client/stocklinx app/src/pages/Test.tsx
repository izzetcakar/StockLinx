import { useDispatch, useSelector } from "react-redux";
import BaseDataGrid from "../components/generic/BaseDataGrid";
import { branchActions } from "../redux/branch/actions";
import { categoryActions } from "../redux/category/actions";
import { companyActions } from "../redux/company/actions";
import "./test.scss";
import { datagridRequest } from "../functions/datagridRequest";
import { useColumns } from "./category/columns";
import { RootState } from "../redux/rootReducer";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { ICategory } from "../interfaces/interfaces";

const Test = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const refreshData = () => {
    dispatch(categoryActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };
  const onRowInserting = async (e: RowInsertingEvent<ICategory>) => {
    const newObject = { ...e.data };
    await datagridRequest(e, "Category", "post", newObject);
  };
  const onRowUpdating = async (e: RowUpdatingEvent<ICategory>) => {
    const newObject = { ...e.oldData, ...e.newData };
    await datagridRequest(e, "Category", "put", newObject);
  };
  const onRowRemoving = (e: RowRemovingEvent<ICategory>) => {
    datagridRequest(e, `Category/${e.data.id}`, "delete");
  };

  return (
    <BaseDataGrid
      title="Category"
      data={categories}
      columns={useColumns().devColumns}
      formItems={useColumns().formItems}
      onRowInserting={onRowInserting}
      onRowUpdating={onRowUpdating}
      onRowRemoving={onRowRemoving}
      refreshData={refreshData}
      toolbarAddButton={true}
    />
  );
};

export default Test;
