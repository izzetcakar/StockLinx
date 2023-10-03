import GridTable from "../../components/gridTable/GridTable";
import { ICategory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import { openCategoryModal } from "../../modals/category/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { useColumns } from "./columns";
import BaseDataGrid from "../../components/generic/BaseDataGrid";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const onRowInsert = () => {
    openCategoryModal();
  };
  const onRowUpdate = (row: object) => {
    const data = row as ICategory;
    openCategoryModal(data);
  };
  const onRowRemove = (row: object) => {
    const id: string = (row as ICategory).id as string;
    genericConfirmModal(() => dispatch(categoryActions.remove({ id: id })));
  };
  const refreshData = () => {
    dispatch(categoryActions.getAll());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <GridTable
        itemKey="id"
        data={categories}
        columns={useColumns().columns}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowRemove={onRowRemove}
        refreshData={refreshData}
      />
      <BaseDataGrid
        title="Category"
        data={categories}
        columns={useColumns().devColumns}
        formItems={useColumns().formItems}
      />
    </div>
  );
};

export default Category;
