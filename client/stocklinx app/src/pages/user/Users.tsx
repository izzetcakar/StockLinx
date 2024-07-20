import { useUser } from "@/hooks/query";
import { useColumns } from "./columns";
import { openUserModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Users = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useUser.GetAll();
  const { mutate: remove } = useUser.Remove();
  const { mutate: removeRange } = useUser.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openUserModal()}
      onCopy={(value: any) => openUserModal({ ...value, id: "" })}
      onUpdate={(value: any) => openUserModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Users;
