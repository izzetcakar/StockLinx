import { IManufacturer } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openManufacturerModal } from "../../modals/modals";
import { useContext } from "react";
import { useManufacturer } from "@/hooks/manufacturer";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Manufacturer = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: manufacturers } = useManufacturer.Filter([]);
  const { mutate: filter } = useManufacturer.ApplyFilters();
  const { mutate: remove } = useManufacturer.Remove();
  const { mutate: removeRange } = useManufacturer.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Manufacturers</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={manufacturers || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(manufacturer) =>
          openManufacturerModal(manufacturer as IManufacturer)
        }
        onRowInsert={() => openManufacturerModal()}
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

export default Manufacturer;
