import { IUser } from "../../interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openUserModal } from "../../modals/modals";
import { useContext } from "react";
import { useUser } from "@/hooks/user";
import GenericContext from "../../context/GenericContext";
import Gridtable from "@components/gridTable/GridTable";

const User = () => {
  const { drawerBadge } = useContext(GenericContext);
  const { data: users } = useUser.Filter([]);
  const { mutate: filter } = useUser.ApplyFilters();
  const { mutate: remove } = useUser.Remove();
  const { mutate: removeRange } = useUser.RemoveRange();

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Users</div>
        {drawerBadge()}
      </div>
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
