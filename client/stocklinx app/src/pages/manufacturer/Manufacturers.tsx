import { IManufacturer } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openManufacturerModal } from "../../modals/modals";
import { useManufacturer } from "@/hooks/manufacturer";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Manufacturer = () => {
  const { data: manufacturers } = useManufacturer.Filter([]);
  const { mutate: filter } = useManufacturer.ApplyFilters();
  const { mutate: remove } = useManufacturer.Remove();
  const { mutate: removeRange } = useManufacturer.RemoveRange();

  return (
    <>
      <PageHeader title="Manufacturers" />
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
