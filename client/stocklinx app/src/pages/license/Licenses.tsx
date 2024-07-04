import { ILicense } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openLicenseModal } from "@/utils/modalUtils";
import { useLicense } from "@/hooks/query/license";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";
import { useNavigate } from "react-router-dom";

const License = () => {
  const navigate = useNavigate();
  const { data: licenses } = useLicense.Filter();
  const { mutate: filter } = useLicense.ApplyFilters();
  const { mutate: remove } = useLicense.Remove();
  const { mutate: removeRange } = useLicense.RemoveRange();

  const navigateDetail = (licenseDetails: ILicense[]) => {
    if (!licenseDetails.length) return;
    navigate("/license", { state: { licenses: licenseDetails } });
  };

  return (
    <>
      <PageHeader title="Licenses" />
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
        onRowDetail={(licenses) => navigateDetail(licenses as ILicense[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default License;
