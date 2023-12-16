import { ICategory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { useColumns } from "./columns";
import { categoryActions } from "../../redux/category/actions";
import { branchActions } from "../../redux/branch/actions";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { openCategoryModal } from "../../modals/modals";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const refreshData = () => {
    dispatch(categoryActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Categories</div>
      </div>
      <Gridtable
        data={categories}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(category) => openCategoryModal(category as ICategory)}
        onRowInsert={() => openCategoryModal()}
        onRowRemove={(id) => dispatch(categoryActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(categoryActions.removeRange({ ids: ids }))
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

export default Category;
