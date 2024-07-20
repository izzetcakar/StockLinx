import { useManufacturer } from "@/hooks/query";
import { useColumns } from "./columns";
import { openManufacturerModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Manufacturers = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useManufacturer.GetAll();
  const { mutate: remove } = useManufacturer.Remove();
  const { mutate: removeRange } = useManufacturer.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openManufacturerModal()}
      onCopy={(value: any) => openManufacturerModal({ ...value, id: "" })}
      onUpdate={(value: any) => openManufacturerModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Manufacturers;
