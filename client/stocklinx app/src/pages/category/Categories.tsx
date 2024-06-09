import { ICategory } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openCategoryModal } from "../../modals/modals";
import { useContext } from "react";
import { useCategory } from "@/hooks/category";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Category = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useCategory.Filter();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Categories</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(category) => openCategoryModal(category as ICategory)}
        onRowInsert={() => openCategoryModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        excelColumns={useColumns().excelColumns}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
