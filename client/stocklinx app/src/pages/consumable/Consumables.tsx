import { IConsumable } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openConsumableModal } from "../../modals/modals";
import { useContext } from "react";
import { useConsumable } from "@/hooks/consumable";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Consumable = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useConsumable.Filter();
  const { mutate: remove } = useConsumable.Remove();
  const { mutate: removeRange } = useConsumable.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Consumables</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(consumable) =>
          openConsumableModal(consumable as IConsumable)
        }
        onRowInsert={() => openConsumableModal()}
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

export default Consumable;
