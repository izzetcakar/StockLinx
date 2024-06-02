import { ICategory } from "@interfaces/serverInterfaces";
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
      <div className="page__content__header">
        <div className="page__content__header__title">Categories</div>
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
        onApplyFilters={(filters) => dispatch(categoryActions.filter(filters))}
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
