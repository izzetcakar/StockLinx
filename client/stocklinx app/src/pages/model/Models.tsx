import { useModel } from "@/hooks/query";
import { useColumns } from "./columns";
import { openModelModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Models = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useModel.GetAll();
  const { mutate: remove } = useModel.Remove();
  const { mutate: removeRange } = useModel.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openModelModal()}
      onCopy={(value: any) => openModelModal({ ...value, id: "" })}
      onUpdate={(value: any) => openModelModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Models;
