import { ICompany } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openCompanyModal } from "../../modals/modals";
import { useContext } from "react";
import { useCompany } from "@/hooks/company";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Company = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data, mutate: filter } = useCompany.Filter();
  const { mutate: remove } = useCompany.Remove();
  const { mutate: removeRange } = useCompany.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Companies</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={data || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(company) => openCompanyModal(company as ICompany)}
        onRowInsert={() => openCompanyModal()}
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

export default Company;
