import { useEmployee } from "@/hooks/query";
import { useColumns } from "./columns";
import { openEmployeeModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Employees = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useEmployee.GetAll();
  const { mutate: remove } = useEmployee.Remove();
  const { mutate: removeRange } = useEmployee.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openEmployeeModal()}
      onCopy={(value: any) => openEmployeeModal({ ...value, id: "" })}
      onUpdate={(value: any) => openEmployeeModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Employees;
