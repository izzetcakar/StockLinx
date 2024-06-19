import { ICategory } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openCategoryModal } from "../../modals/modals";
import { useCategory } from "@/hooks/category";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Category = () => {
  const { data: categories } = useCategory.Filter([]);
  const { mutate: filter } = useCategory.ApplyFilters();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  return (
    <>
      <PageHeader title="Categories" />
      <Gridtable
        data={categories || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(category) => openCategoryModal(category as ICategory)}
        onRowInsert={() => openCategoryModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
