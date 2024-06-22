import { IConsumable } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openConsumableModal } from "@/utils/modalUtils";
import { useConsumable } from "@/hooks/query/consumable";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Consumable = () => {
  const { data: consumables } = useConsumable.Filter([]);
  const { mutate: filter } = useConsumable.ApplyFilters();
  const { mutate: remove } = useConsumable.Remove();
  const { mutate: removeRange } = useConsumable.RemoveRange();

  return (
    <>
      <PageHeader title="Consumables" enableCompanyDrawer />
      <Gridtable
        data={consumables || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(consumable) =>
          openConsumableModal(consumable as IConsumable)
        }
        onRowInsert={() => openConsumableModal()}
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

export default Consumable;
