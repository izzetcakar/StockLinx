import { ILicense } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openLicenseModal } from "../../modals/modals";
import { useContext } from "react";
import { useLicense } from "@/hooks/license";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const License = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useLicense.Filter();
  const { mutate: remove } = useLicense.Remove();
  const { mutate: removeRange } = useLicense.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Licenses</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(license) => openLicenseModal(license as ILicense)}
        onRowInsert={() => openLicenseModal()}
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

export default License;
