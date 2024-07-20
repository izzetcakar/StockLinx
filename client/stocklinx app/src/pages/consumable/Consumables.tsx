import { useConsumable } from "@/hooks/query";
import { useColumns } from "./columns";
import { openConsumableModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Consumables = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useConsumable.GetAll();
  const { mutate: remove } = useConsumable.Remove();
  const { mutate: removeRange } = useConsumable.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openConsumableModal()}
      onCopy={(value: any) => openConsumableModal({ ...value, id: "" })}
      onUpdate={(value: any) => openConsumableModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Consumables;
