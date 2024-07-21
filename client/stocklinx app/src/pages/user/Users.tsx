import { useUser } from "@/hooks/query";
import { useColumns } from "./columns";
import { openUserModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Users = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useUser.GetAll();
  const { mutate: remove } = useUser.Remove();
  const { mutate: removeRange } = useUser.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/user", { state: { users: values } });
  };

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
      onDetails={(values: any[]) => onDetails(values)}
    />
  );
};

export default Users;
