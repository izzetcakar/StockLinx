import { useCompany } from "@/hooks/query";
import { useColumns } from "./columns";
import { openCompanyModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Companies = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useCompany.GetAll();
  const { mutate: remove } = useCompany.Remove();
  const { mutate: removeRange } = useCompany.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openCompanyModal()}
      onCopy={(value: any) => openCompanyModal({ ...value, id: "" })}
      onUpdate={(value: any) => openCompanyModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Companies;
