import { useLicense } from "@/hooks/query";
import { useColumns } from "./columns";
import { openLicenseModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Licenses = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useLicense.GetAll();
  const { mutate: remove } = useLicense.Remove();
  const { mutate: removeRange } = useLicense.RemoveRange();

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openLicenseModal()}
      onCopy={(value: any) => openLicenseModal({ ...value, id: "" })}
      onUpdate={(value: any) => openLicenseModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
    />
  );
};

export default Licenses;
