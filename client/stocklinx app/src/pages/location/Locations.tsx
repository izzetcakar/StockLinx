import { useLocation } from "@/hooks/query";
import { useColumns } from "./columns";
import { openLocationModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Locations = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useLocation.GetAll();
  const { mutate: remove } = useLocation.Remove();
  const { mutate: removeRange } = useLocation.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openLocationModal()}
      onCopy={(value: any) => openLocationModal({ ...value, id: "" })}
      onUpdate={(value: any) => openLocationModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Locations;
