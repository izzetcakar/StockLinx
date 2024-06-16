import { ILocation } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openLocationModal } from "../../modals/modals";
import { useContext } from "react";
import { useLocation } from "@/hooks/location";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Location = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: locations } = useLocation.Filter([]);
  const { mutate: filter } = useLocation.ApplyFilters();
  const { mutate: remove } = useLocation.Remove();
  const { mutate: removeRange } = useLocation.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Locations</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={locations || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(location) => openLocationModal(location as ILocation)}
        onRowInsert={() => openLocationModal()}
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

export default Location;
