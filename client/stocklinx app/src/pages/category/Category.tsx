import React from "react";
import { ICategory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { datagridRequest } from "../../functions/datagridRequest";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import { useEffect } from "react";
import BaseSuiteDatagrid from "../../components/reactSuiteComponents/datagrid/BaseSuiteDatagrid";
import { MantineReactTable } from "mantine-react-table";
import Gridtable from "../../components/gridTable/Gridtable";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  useEffect(() => {
    refreshData();
  }, []);

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
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Categories</div>
      </div>
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
      <div style={{ padding: "1rem 0" }}></div>
      <Gridtable
        data={categories}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
      />
      {/* <MantineReactTable table={useColumns().table} /> */}
    </>
  );
};

export default Category;
