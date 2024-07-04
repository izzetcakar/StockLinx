import { IUser } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openUserModal } from "@/utils/modalUtils";
import { useUser } from "@/hooks/query/user";
import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@components/gridTable/GridTable";

const User = () => {
  const { data: users } = useUser.Filter();
  const { mutate: filter } = useUser.ApplyFilters();
  const { mutate: remove } = useUser.Remove();
  const { mutate: removeRange } = useUser.RemoveRange();

  return (
    <>
      <PageHeader title="Users" />
      <Gridtable
        data={users || []}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={() => filter([])}
        onRowUpdate={(user) => openUserModal(user as IUser)}
        onRowInsert={() => openUserModal()}
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

export default User;
