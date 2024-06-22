import { IAccessory } from "@interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openAccessoryModal } from "../../modals/modals";
import { useAccessory } from "@/hooks/query/accessory";
import Gridtable from "@components/gridTable/GridTable";
import PageHeader from "@/components/generic/PageHeader";

const Accessory = () => {
  const { data: accessories } = useAccessory.Filter([]);
  const { mutate: filter } = useAccessory.ApplyFilters();
  const { mutate: remove } = useAccessory.Remove();
  const { mutate: removeRange } = useAccessory.RemoveRange();

  return (
    <>
      <PageHeader title="Accessories" enableCompanyDrawer />
      <Gridtable
        data={accessories || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(accessory) => openAccessoryModal(accessory as IAccessory)}
        onRowInsert={() => openAccessoryModal()}
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

export default Accessory;
