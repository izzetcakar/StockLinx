import { useAccessory } from "@/hooks/query";
import { useColumns } from "./columns";
import { openAccessoryModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Accessories = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useAccessory.GetAll();
  const { mutate: remove } = useAccessory.Remove();
  const { mutate: removeRange } = useAccessory.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openAccessoryModal()}
      onCopy={(value: any) => openAccessoryModal({ ...value, id: "" })}
      onUpdate={(value: any) => openAccessoryModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Accessories;
