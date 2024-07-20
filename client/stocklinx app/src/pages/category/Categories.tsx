import { useCategory } from "@/hooks/query";
import { useColumns } from "./columns";
import { openCategoryModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Categories = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useCategory.GetAll();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openCategoryModal()}
      onCopy={(value: any) => openCategoryModal({ ...value, id: "" })}
      onUpdate={(value: any) => openCategoryModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Categories;
