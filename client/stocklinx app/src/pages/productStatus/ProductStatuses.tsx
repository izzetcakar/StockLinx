import { IProductStatus } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openProductStatusModal } from "@/utils/modalUtils";
import { useProductStatus } from "@/hooks/query/productStatus";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const ProductStatus = () => {
  const { data: productStatuses } = useProductStatus.Filter();
  const { mutate: filter } = useProductStatus.ApplyFilters();
  const { mutate: remove } = useProductStatus.Remove();
  const { mutate: removeRange } = useProductStatus.RemoveRange();

  return (
    <>
      <PageHeader title="Product Statuses" />
      <Gridtable
        data={productStatuses || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(productStatus) =>
          openProductStatusModal(productStatus as IProductStatus)
        }
        onRowInsert={() => openProductStatusModal()}
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

export default ProductStatus;
