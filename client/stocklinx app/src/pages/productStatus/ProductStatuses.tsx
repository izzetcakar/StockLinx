import { IProductStatus } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openProductStatusModal } from "../../modals/modals";
import { useContext } from "react";
import { useProductStatus } from "@/hooks/productStatus";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const ProductStatus = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: productStatuses } = useProductStatus.Filter([]);
  const { mutate: filter } = useProductStatus.ApplyFilters();
  const { mutate: remove } = useProductStatus.Remove();
  const { mutate: removeRange } = useProductStatus.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">ProductStatuses</div>
        {drawerBadge()}
      </div>
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
        excelColumns={useColumns().excelColumns}
        onApplyFilters={(filters) => filter(filters)}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default ProductStatus;
