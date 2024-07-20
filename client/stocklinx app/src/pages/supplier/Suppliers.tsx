import { useSupplier } from "@/hooks/query";
import { useColumns } from "./columns";
import { openSupplierModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Suppliers = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useSupplier.GetAll();
  const { mutate: remove } = useSupplier.Remove();
  const { mutate: removeRange } = useSupplier.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openSupplierModal()}
      onCopy={(value: any) => openSupplierModal({ ...value, id: "" })}
      onUpdate={(value: any) => openSupplierModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Suppliers;
