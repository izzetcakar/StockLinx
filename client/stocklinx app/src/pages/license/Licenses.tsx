import { ILicense } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openLicenseModal } from "@/utils/modalUtils";
import { useLicense } from "@/hooks/query/license";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const License = () => {
  const { data: licenses } = useLicense.Filter([]);
  const { mutate: filter } = useLicense.ApplyFilters();
  const { mutate: remove } = useLicense.Remove();
  const { mutate: removeRange } = useLicense.RemoveRange();

  return (
    <>
      <PageHeader title="Licenses" enableCompanyDrawer />
      <Gridtable
        data={licenses || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(license) => openLicenseModal(license as ILicense)}
        onRowInsert={() => openLicenseModal()}
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

export default License;
