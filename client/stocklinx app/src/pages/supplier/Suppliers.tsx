import { ISupplier } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openSupplierModal } from "../../modals/modals";
import { useContext } from "react";
import { useSupplier } from "@/hooks/supplier";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Supplier = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: suppliers } = useSupplier.Filter([]);
  const { mutate: filter } = useSupplier.ApplyFilters();
  const { mutate: remove } = useSupplier.Remove();
  const { mutate: removeRange } = useSupplier.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Suppliers</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={suppliers || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(supplier) => openSupplierModal(supplier as ISupplier)}
        onRowInsert={() => openSupplierModal()}
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

export default Supplier;
