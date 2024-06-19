import { ISupplier } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openSupplierModal } from "../../modals/modals";
import { useSupplier } from "@/hooks/supplier";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Supplier = () => {
  const { data: suppliers } = useSupplier.Filter([]);
  const { mutate: filter } = useSupplier.ApplyFilters();
  const { mutate: remove } = useSupplier.Remove();
  const { mutate: removeRange } = useSupplier.RemoveRange();

  return (
    <>
      <PageHeader title="Suppliers" />
      <Gridtable
        data={suppliers || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(supplier) => openSupplierModal(supplier as ISupplier)}
        onRowInsert={() => openSupplierModal()}
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

export default Supplier;
