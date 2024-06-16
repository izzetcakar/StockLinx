import { IBranch } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openBranchModal } from "../../modals/modals";
import { useContext } from "react";
import { useBranch } from "@/hooks/branch";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const Branch = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: branches } = useBranch.Filter([]);
  const { mutate: filter } = useBranch.ApplyFilters();
  const { mutate: remove } = useBranch.Remove();
  const { mutate: removeRange } = useBranch.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Branches</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={branches || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(branch) => openBranchModal(branch as IBranch)}
        onRowInsert={() => openBranchModal()}
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

export default Branch;
