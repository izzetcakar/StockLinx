import { useComponent } from "@/hooks/query";
import { useColumns } from "./columns";
import { openComponentModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Components = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useComponent.GetAll();
  const { mutate: remove } = useComponent.Remove();
  const { mutate: removeRange } = useComponent.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openComponentModal()}
      onCopy={(value: any) => openComponentModal({ ...value, id: "" })}
      onUpdate={(value: any) => openComponentModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Components;
