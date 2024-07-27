import { useCategory } from "@/hooks/query";
import { useColumns } from "./columns";
import { openCategoryModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Categories = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useCategory.GetAll();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/category", { state: { categories: values } });
  };

  return (
    <>
      <PageHeader title="Categories" />
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
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Categories;
