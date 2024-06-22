import { ICategory } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openCategoryModal } from "../../modals/modals";
import { useCategory } from "@/hooks/category";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { data: categories } = useCategory.Filter([]);
  const { mutate: filter } = useCategory.ApplyFilters();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  const navigateDetail = (categoryDetails: ICategory[]) => {
    if (!categoryDetails.length) return;
    navigate("/category", { state: { categories: categoryDetails } });
  };

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
        onRowDetail={(categories) => navigateDetail(categories as ICategory[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
