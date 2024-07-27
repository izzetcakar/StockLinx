import { usePermission } from "@/hooks/query";
import { useColumns } from "./columns";
import { openPermissionModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Permissions = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = usePermission.GetAll();
  const { mutate: remove } = usePermission.Remove();
  const { mutate: removeRange } = usePermission.RemoveRange();

  return (
    <>
      <PageHeader title="Permissions" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openPermissionModal()}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
      />
    </>
  );
};

export default Permissions;
