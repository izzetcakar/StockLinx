import { useDepartment } from "@/hooks/query";
import { useColumns } from "./columns";
import { openDepartmentModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Departments = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useDepartment.GetAll();
  const { mutate: remove } = useDepartment.Remove();
  const { mutate: removeRange } = useDepartment.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openDepartmentModal()}
      onCopy={(value: any) => openDepartmentModal({ ...value, id: "" })}
      onUpdate={(value: any) => openDepartmentModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Departments;
