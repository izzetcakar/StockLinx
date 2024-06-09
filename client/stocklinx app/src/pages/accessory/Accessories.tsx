import { useContext } from "react";
import { IAccessory } from "@interfaces/serverInterfaces";
import { useColumns } from "./columns";
import Gridtable from "@components/gridTable/GridTable";
import { openAccessoryModal } from "../../modals/modals";
import GenericContext from "../../context/GenericContext";
import { useAccessory } from "@/hooks/accessory";

const Accessory = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: accessories, mutate: filter } = useAccessory.Filter();
  const { mutate: remove } = useAccessory.Remove();
  const { mutate: removeRange } = useAccessory.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Accessories</div>
        {drawerBadge()}
      </div>
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
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Accessory;
