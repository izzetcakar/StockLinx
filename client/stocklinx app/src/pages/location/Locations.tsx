import { ILocation } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openLocationModal } from "@/utils/modalUtils";
import { useLocation } from "@queryhooks";
import Gridtable from "@components/gridTable/GridTable";
import PageHeader from "@/components/generic/PageHeader";

const Location = () => {
  const { data: locations } = useLocation.Filter();
  const { mutate: filter } = useLocation.ApplyFilters();
  const { mutate: remove } = useLocation.Remove();
  const { mutate: removeRange } = useLocation.RemoveRange();

  return (
    <>
      <PageHeader title="Locations" />
      <Gridtable
        data={locations || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(location) => openLocationModal(location as ILocation)}
        onRowInsert={() => openLocationModal()}
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

export default Location;
