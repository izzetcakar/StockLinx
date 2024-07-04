import { ICompany } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openCompanyModal } from "@/utils/modalUtils";
import { useCompany } from "@/hooks/query/company";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Company = () => {
  const { data: companies } = useCompany.Filter();
  const { mutate: filter } = useCompany.ApplyFilters();
  const { mutate: remove } = useCompany.Remove();
  const { mutate: removeRange } = useCompany.RemoveRange();

  return (
    <>
      <PageHeader title="Companies" />
      <Gridtable
        data={companies || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(company) => openCompanyModal(company as ICompany)}
        onRowInsert={() => openCompanyModal()}
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

export default Company;
