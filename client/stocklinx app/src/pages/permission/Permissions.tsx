import { useColumns } from "./columns";
import { usePermission } from "@/hooks/query/permission";
import { openPermissionModal } from "@/utils/modalUtils";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const Permission = () => {
  const { data: permissions } = usePermission.Filter();
  const { mutate: filter } = usePermission.ApplyFilters();
  const { mutate: remove } = usePermission.Remove();
  const { mutate: removeRange } = usePermission.RemoveRange();

  return (
    <>
      <PageHeader title="Permissions" />
      <Gridtable
        data={permissions || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowInsert={() => openPermissionModal()}
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

export default Permission;
